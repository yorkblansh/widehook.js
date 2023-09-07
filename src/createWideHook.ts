import { BehaviorSubject, map, pairwise } from 'rxjs'
import { HereContext, whEventCallback } from './createEvent'
import { HookState, Modes, UnwrapObservable } from './types'
import { useEffect, useState } from 'react'
import { useSignal } from '@preact/signals-react'
import { AUX, useOtherStateByHook } from './useOtherStateByHook'

export type WideState<
	State
	// Mode extends Modes | undefined
> = [
	State,
	// HookState<State>[Mode extends undefined ? 'default' : Mode],
	(newState: State) => void
	// HereContext<State>
]

export type OtherWideState<
	State
	// Mode extends Modes | undefined
> = [
	State,
	// HookState<State>[Mode extends undefined ? 'default' : Mode],
	(newState: State) => void,
	HereContext<State>
]

export type WideHook<
	State
	// Mode extends Modes | undefined
> = () => WideState<State>
// Mode

export type OtherWideHook<
	State
	// Mode extends Modes | undefined
> = () => OtherWideState<State>

export const createWideHook = <
	State
	// Mode extends Modes | undefined = undefined,
	// _Mode extends Modes = Mode extends undefined ? 'default' : Mode
>({
	key,
	init,
	mode,
	on: eventCallback,
}: {
	key?: string
	init: State
	mode?: Modes
	on?: whEventCallback<State>
}) => {
	const prevStateMap = new Map<'prevState', State>()

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

	const lookFor: (eventCallback: whEventCallback<State>) => void = (
		eventCallback
	) => {
		eventCallback(
			service.value(),
			(state) => {
				if (service.value() !== state) {
					setTimeout(() => service.emit(state), 1)
				}
			},
			hereStuff
		)
	}

	const hereStuff: HereContext<State> = {
		lookFor,
		prevState: prevStateMap.get('prevState') as State,
		useOtherStateByHook,
	}

	service.on().subscribe({
		next: ({ prevState }) => {
			if (eventCallback) {
				const lookFor: (eventCallback: whEventCallback<State>) => void = (
					eventCallback
				) => {
					eventCallback(
						service.value(),
						(state) => {
							if (service.value() !== state) {
								setTimeout(() => service.emit(state), 1)
							}
						},
						hereStuff
					)
				}

				const hereStuff: HereContext<State> = {
					lookFor,
					prevState,
					useOtherStateByHook,
				}

				eventCallback(
					service.value(),
					(state) => {
						if (service.value() !== state) {
							setTimeout(() => service.emit(state), 1)
						}
					},
					hereStuff
				)
			}
		},
	})

	const widehook = () => {
		const [state, setState] = useState(service.value())
		const [prevState, setPrevState] = useState(service.value())
		const signalState = useSignal(service.value())
		const signalPrevState = useSignal(service.value())

		useEffect(() => {
			setState(service.value())

			const setStateByMode = ({
				prevState,
				state,
			}: UnwrapObservable<ReturnType<(typeof service)['on']>>) => {
				if (mode === 'signal') {
					signalState.value = state
					signalPrevState.value = prevState
				} else {
					setState(state)
					setPrevState(prevState)
					prevStateMap.set('prevState', prevState)
				}
			}

			const handleState = (
				states: UnwrapObservable<ReturnType<(typeof service)['on']>>
			) => {
				setStateByMode(states)
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

		const lookFor: (eventCallback: whEventCallback<State>) => void = (
			eventCallback
		) => {
			eventCallback(
				service.value(),
				(state) => {
					if (service.value() !== state) {
						setTimeout(() => service.emit(state), 1)
					}
				},
				hereStuff
			)
		}

		const hereStuff: HereContext<State> = {
			lookFor,
			prevState,
			useOtherStateByHook,
		}

		return [
			finalState,
			(newState: State) => service.emit(newState),
		] as WideState<State>
	}

	widehook.aux = {
		key,
		state: service.value,
		setState: service.emit,
		hereStuff: {
			lookFor,
			prevState: prevStateMap.get('prevState') as State,
			useOtherStateByHook,
		} as HereContext<State>,
	} as AUX<State>

	return widehook as WideHook<State>
}
