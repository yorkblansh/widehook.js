import type { WideHook, WideHookWithAux } from './types'
import { useEffect, useState } from 'react'
import { fromHook } from './fromHook'
import { initStore } from './initStore'
import type { ActionCallback, Scope } from './types/ActionCallback'

export const createWideHook = <State>({
	init,
	on: ACTION_CALLBACK,
}: {
	/**
	 * initial value
	 */
	init: State

	/**
	 * action callback reacts on every change of current state
	 */
	on?: ActionCallback<State>
}) => {
	let effected: boolean = false
	let actionHappened: boolean = true
	const STORE = initStore(init)

	const scope: Scope = {
		fromHook,
		effect(setup) {
			if (!effected) {
				effected = true
				const after = setup()

				if (typeof after === 'function') {
					setTimeout(() => {
						after()
					}, 1)
				}
			}
		},
	}

	const widehook: WideHookWithAux<State> = () => {
		const [state, setState] = useState(STORE.value())

		useEffect(() => {
			setState(STORE.value())

			const subscription = STORE.listen({
				next: ({ currentValue }) => {
					setState(currentValue)

					if (ACTION_CALLBACK && actionHappened) {
						actionHappened = false

						ACTION_CALLBACK(
							currentValue,
							(nextState) => {
								actionHappened = true
								STORE.set(nextState)
							},
							scope
						)
					}
				},
			})

			return () => {
				subscription.unsubscribe()
			}
		}, [])

		return [
			state,
			(nextState) => {
				STORE.set(nextState)
				actionHappened = true
			},
		]
	}

	/**
	 * passing state functions into aux to use inside {@link fromHook}
	 * for accessing within another widehook {@link ActionCallback}
	 */
	widehook.aux = {
		state: () => STORE.value(),
		setState: (nextState) => {
			actionHappened = true
			STORE.set(nextState)
		},
		scope,
	}

	return widehook as WideHook<State>
}
