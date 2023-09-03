import {
	Context,
	Modes,
	PassageCallback,
	UnwrapObservable,
	WideHook,
	WideState,
} from './types'
import { useEffect, useState } from 'react'
import { useSignal } from '@preact/signals-react'
import { AUX, takeOtherStateByHook } from './takeOtherStateByHook'
import { rxService as initRxService } from './rxService'

export const createWideHook = <State>({
	// key,
	init,
	// mode,
	on: CB,
}: {
	//TODO for the future dev tools features
	// key?: string
	init: State
	// mode?: Modes
	on?: PassageCallback<State>
}) => {
	const mode: Modes = 'default'
	let isSetInsideComponent: boolean = true
	const rxService = initRxService(init)

	rxService.on().subscribe({
		next: ({ state }) => {
			console.log({ state })

			if (CB && isSetInsideComponent) {
				console.log({ isSetInsideComponent })
				// const state = rxService.value()
				const setState = (state: State) => {
					if (rxService.value() !== state) {
						setTimeout(() => {
							isSetInsideComponent = false

							rxService.emit(state)
						}, 1)
					}
				}
				const context: Context<State> = {
					prevState: rxService.previousValue,
					takeOtherStateByHook: takeOtherStateByHook,
				}

				CB(state, setState, context)
			}
		},
	})

	const widehook = () => {
		const [state, setState] = useState(rxService.value())
		const signalState = useSignal(rxService.value())

		useEffect(() => {
			setState(rxService.value())

			const setStateByMode = ({
				state,
			}: UnwrapObservable<ReturnType<(typeof rxService)['on']>>) => {
				// if (mode === 'signal') {
				// 	signalState.value = state
				// } else {
				setState(state)
				// }
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

		return [
			finalState,
			(newState: State) => {
				isSetInsideComponent = true
				return rxService.emit(newState)
			},
		] as WideState<State>
	}

	widehook.aux = {
		// key,
		state: rxService.value,
		setState: (state) => {
			isSetInsideComponent = true
			return rxService.emit(state)
		},
		context: {
			prevState: rxService.previousValue,
			takeOtherStateByHook: takeOtherStateByHook,
		} as Context<State>,
	} as AUX<State>

	return widehook as WideHook<State>
}
