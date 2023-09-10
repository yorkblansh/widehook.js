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
import { AUX } from './takeOtherStateByHook'
import { _rxService } from './_rxService'
import { _createPassageContext } from './passage/context/_createPassageContext'

export const createWideHook = <State>({
	key,
	init,
	mode,
	on: passageCb,
}: {
	key?: string
	init: State
	mode?: Modes
	on?: PassageCallback<State>
}) => {
	const rxService = _rxService(init)
	const passageContext = _createPassageContext(rxService)

	if (passageCb)
		rxService.on().subscribe({
			next: () => {
				const state = rxService.value
				const setState = (state: State) => {
					if (rxService.value() !== state) {
						setTimeout(() => rxService.emit(state), 1)
					}
				}
				passageCb(state, setState, passageContext)
			},
		})

	const widehook = () => {
		// const [state, setState] = useState(rxService.value())
		// const signalState = useSignal(rxService.value())
		// const signalPrevState = useSignal(rxService.value())

		useEffect(() => {
			// setState(rxService.value())

			// const setStateByMode = ({
			// 	prevState,
			// 	state,
			// }: UnwrapObservable<ReturnType<(typeof rxService)['on']>>) => {
			// 	if (mode === 'signal') {
			// 		signalState.value = state
			// 		signalPrevState.value = prevState
			// 	} else {
			// 		setState(state)
			// 	}
			// }

			// const handleState = (
			// 	states: UnwrapObservable<ReturnType<(typeof rxService)['on']>>
			// ) => {
			// 	setStateByMode(states)
			// }

			const subscription = rxService.on().subscribe({
				// next: handleState,
				error: (error) => console.log('This is called when error occurs'),
				complete: () => console.log('This is called when subscription closed'),
			})

			return () => {
				subscription.unsubscribe()
			}
		}, [])

		// const stateMap: { [each in Modes]: unknown } = {
		// 	default: state,
		// 	signal: signalState,
		// }

		// const finalState = stateMap[mode ? mode : 'default']

		return [
			rxService.value,
			(newState: State) => rxService.emit(newState),
		] as WideState<State>
	}

	widehook.aux = {
		key,
		state: rxService.value,
		setState: rxService.emit,
		passageContext,
	} as AUX<State>

	return widehook as WideHook<State>
}
