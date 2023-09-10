import {
	PassageContext,
	Modes,
	UnwrapObservable,
	WideHook,
	WideState,
	PassageCallback,
} from './types'
import { useEffect, useState } from 'react'
import { useSignal } from '@preact/signals-react'
import { AUX, takeOtherStateByHook } from './takeOtherStateByHook'
import { RxService } from './RxService'

export const createWideHook = <State>({
	key,
	init,
	mode,
	on: CB,
}: {
	key?: string
	init: State
	mode?: Modes
	on?: PassageCallback<State>
}) => {
	const prevStateMap = new Map<'prevState', State>()

	const rxService = RxService(init)

	const lookFor: (eventCallback: PassageCallback<State>) => void = (
		eventCallback
	) => {
		eventCallback(
			rxService.value(),
			(state) => {
				if (rxService.value() !== state) {
					setTimeout(() => rxService.emit(state), 1)
				}
			},
			hereStuff
		)
	}

	const hereStuff: PassageContext<State> = {
		lookFor,
		prevState: rxService.previousValue(),
		takeOtherStateByHook: takeOtherStateByHook,
	}

	rxService.on().subscribe({
		next: ({ prevState }) => {
			if (CB) {
				const lookFor: (eventCallback: PassageCallback<State>) => void = (
					eventCallback
				) => {
					eventCallback(
						rxService.value(),
						(state) => {
							if (rxService.value() !== state) {
								setTimeout(() => rxService.emit(state), 1)
							}
						},
						hereStuff
					)
				}

				const hereStuff: PassageContext<State> = {
					lookFor,
					prevState,
					takeOtherStateByHook: takeOtherStateByHook,
				}

				CB(
					rxService.value(),
					(state) => {
						if (rxService.value() !== state) {
							setTimeout(() => rxService.emit(state), 1)
						}
					},
					hereStuff
				)
			}
		},
	})

	const widehook = () => {
		const [state, setState] = useState(rxService.value())
		const [prevState, setPrevState] = useState(rxService.value())
		const signalState = useSignal(rxService.value())
		const signalPrevState = useSignal(rxService.value())

		useEffect(() => {
			setState(rxService.value())

			const setStateByMode = ({
				prevState,
				state,
			}: UnwrapObservable<ReturnType<(typeof rxService)['on']>>) => {
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
				states: UnwrapObservable<ReturnType<(typeof rxService)['on']>>
			) => {
				setStateByMode(states)
			}

			const subscription = rxService.on().subscribe({
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

		const lookFor: (eventCallback: PassageCallback<State>) => void = (
			eventCallback
		) => {
			eventCallback(
				rxService.value(),
				(state) => {
					if (rxService.value() !== state) {
						setTimeout(() => rxService.emit(state), 1)
					}
				},
				hereStuff
			)
		}

		const hereStuff: PassageContext<State> = {
			lookFor,
			prevState,
			takeOtherStateByHook: takeOtherStateByHook,
		}

		return [
			finalState,
			(newState: State) => rxService.emit(newState),
		] as WideState<State>
	}

	widehook.aux = {
		key,
		state: rxService.value,
		setState: rxService.emit,
		context: {
			lookFor,
			prevState: rxService.previousValue(),
			takeOtherStateByHook: takeOtherStateByHook,
		} as PassageContext<State>,
	} as AUX<State>

	return widehook as WideHook<State>
}
