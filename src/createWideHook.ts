import type { WideHook, WideHookWithAux, WideState } from './types'
import { useEffect, useState } from 'react'
import { fromHook } from './utils/fromHook'
import { initStore } from './utils/initStore'
import type { ActionCallback, Scope } from './types/ActionCallback'

export function createWideHook<State>({
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
}): WideHook<State> {
	let effected: boolean = false
	let actionHappened: boolean = true
	const STORE = initStore(init)

	const scope: Scope = {
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

	function widehook() {
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
			(nextState: State) => {
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
		setState: (nextState: State) => {
			actionHappened = true
			STORE.set(nextState)
		},
		scope,
	}

	return () => {
		try {
			return widehook() as WideState<State>
		} catch (error) {
			if (error) {
				const targetError =
					'Invalid hook call. Hooks can only be called inside of the body of a function component'

				if (error.toString().includes(targetError)) {
					console.info('Hook was called outside react component')
				}
			}

			return fromHook(widehook as WideHookWithAux<State>)
		}
	}
}
