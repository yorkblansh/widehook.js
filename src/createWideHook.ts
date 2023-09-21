import { ActionCallback, Context, WideHook, WideHookWithAux } from './types'
import { useEffect, useState } from 'react'
import { takeOtherStateByHook } from './takeOtherStateByHook'
import { Store } from './Store'

export const createWideHook = <State>({
	init,
	on: actionCallback,
}: {
	//TODO for the future dev tools features
	// key?: string
	init: State

	/**
	 * action callback reacts on every change of current state
	 */
	on?: ActionCallback<State>
}) => {
	let updatedInsideComponent: boolean = true
	const STORE = new Store(init)
	const context: Context<State> = {
		prevStates: STORE.prevValues,
		takeOtherStateByHook: takeOtherStateByHook,
	}

	/**
	 * action callback handle
	 */
	STORE.listen({
		next: ({ state }) => {
			if (actionCallback && updatedInsideComponent) {
				const setState: Parameters<ActionCallback<State>>[1] = (state) => {
					if (STORE.value() !== state) {
						updatedInsideComponent = false
						STORE.set(state)
					}
				}

				actionCallback(state, setState, context)
			}
		},
	})

	const widehook: WideHookWithAux<State> = () => {
		const [state, setState] = useState(STORE.value())

		useEffect(() => {
			setState(STORE.value())

			const handleState = ({ state }: { prevState: State; state: State }) => {
				setState(state)
			}

			const subscription = STORE.listen({
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
			(newState) => {
				updatedInsideComponent = true
				return STORE.set(newState)
			},
		]
	}

	/**
	 * aux stuff
	 */
	widehook.aux = {
		state: STORE.value,
		//updatedInsideComponent = true
		setState: STORE.set,
		context,
	}

	return widehook as WideHook<State>
}
