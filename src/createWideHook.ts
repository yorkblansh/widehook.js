import { BehaviorSubject, map, pairwise } from 'rxjs'
import { HookEvent, HookEventParams } from './createEvent'
import { HookState, Modes, UnwrapObservable } from './types'
import { useEffect, useState } from 'react'
import { useSignal } from '@preact/signals-react'

export type WideState<State, Mode extends Modes | undefined> = [
	HookState<State>[Mode extends undefined ? 'default' : Mode],
	(newState: State) => void
]

export type WideHook<State, Mode extends Modes | undefined> = () => WideState<
	State,
	Mode
>

export const createWideHook = <
	State,
	Mode extends Modes | undefined = undefined,
	_Mode extends Modes = Mode extends undefined ? 'default' : Mode
>({
	key,
	init,
	mode,
	on: hookEventListener,
}: {
	key?: string
	init: State
	mode?: Mode
	on?: HookEventParams<State, void>
}) => {
	const subject$ = new BehaviorSubject(init)

	const service = {
		emit: (state: State) => subject$.next(state),
		on: () =>
			subject$.pipe(
				pairwise(),
				map(([prevState, state]) => ({ prevState, state }))
			),
		value: () => subject$.getValue(),
	}

	service.on().subscribe({
		next: ({ prevState }) => {
			if (hookEventListener) {
				const lookFor: (event: HookEvent<State>) => void = (hookEvent) => {
					hookEvent(
						service.value(),
						(state) => {
							if (service.value() !== state) {
								setTimeout(() => service.emit(state), 1)
							}
						},
						{ lookFor, prevState }
					)
				}

				hookEventListener(
					service.value(),
					(state) => {
						if (service.value() !== state) {
							setTimeout(() => service.emit(state), 1)
						}
					},
					{
						lookFor,
						prevState,
					}
				)
			}
		},
	})

	const widehook = () => {
		const [state, setState] = useState(service.value())
		const signalState = useSignal(service.value())

		useEffect(() => {
			setState(service.value())

			//TODO getStateByMode
			const setStateByMode = (nextState: State) => {
				if (mode === 'signal') {
					signalState.value = nextState
				} else {
					setState(nextState)
				}
			}

			const handleState = ({
				state,
			}: UnwrapObservable<ReturnType<(typeof service)['on']>>) => {
				setStateByMode(state)
			}

			const subscription = service.on().subscribe({
				next: handleState,
				error: (error) => console.log('This is called when error occurs'),
				complete: () => console.log('This is called when subscription closed'),
			})

			return () => {
				subscription.unsubscribe()
			}
		}, [])

		const stateMap: { [each in Modes]: unknown } = {
			default: state,
			signal: signalState,
		}

		const finalState = stateMap[mode ? mode : 'default']

		return [
			finalState,
			(newState: State) => service.emit(newState),
		] as WideState<State, Mode>
	}

	widehook.aux = {
		key,
		state: service.value,
		setState: service.emit,
	}

	return widehook as WideHook<State, _Mode>
}
