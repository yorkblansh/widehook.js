import { ActionCallback, ActionContext, WideHook, WideState } from './types'
import { useEffect, useState } from 'react'
import { AUX, takeOtherStateByHook } from './takeOtherStateByHook'
import { StateService } from './StateService'

export const createWideHook = <State>({
	init,
	on: actionCallback,
}: {
	//TODO for the future dev tools features
	// key?: string
	init: State
	on?: ActionCallback<State>
}) => {
	let isSetInsideComponent: boolean = true
	const stateService = StateService(init)

	/**
	 * handling action callback
	 */
	stateService.listen({
		next: ({ state }) => {
			if (actionCallback && isSetInsideComponent) {
				const setState = (state: State) => {
					if (stateService.value() !== state) {
						setTimeout(() => {
							isSetInsideComponent = false

							stateService.set(state)
						}, 1)
					}
				}

				actionCallback(state, setState, {
					prevStates: stateService.prevValues,
					takeOtherStateByHook: takeOtherStateByHook,
				})
			}
		},
	})

	const widehook = () => {
		const [state, setState] = useState(stateService.value())

		useEffect(() => {
			setState(stateService.value())

			const setStateByMode = ({
				state: state,
			}: {
				prevState: State
				state: State
			}) => {
				setState(state)
			}

			const handleState = (states: { prevState: State; state: State }) => {
				setStateByMode(states)
			}

			const subscription = stateService.listen({
				next: handleState,
				error: (error) => console.log('This is called when error occurs'),
				complete: () => console.log('This is called when subscription closed'),
			})

			return () => {
				subscription.unsubscribe()
			}
		}, [])

		return [
			state,
			(newState: State) => {
				isSetInsideComponent = true
				return stateService.set(newState)
			},
		] as WideState<State>
	}

	widehook.aux = {
		state: stateService.value,
		setState: (state) => {
			isSetInsideComponent = true
			return stateService.set(state)
		},
		context: {
			prevStates: stateService.prevValues,
			takeOtherStateByHook: takeOtherStateByHook,
		} as ActionContext<State>,
	} as AUX<State>

	return widehook as WideHook<State>
}
