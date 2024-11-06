import type { WideHook, WideObject, WideState } from './types'
import { useEffect, useState } from 'react'
import { AUX, fromHook } from './utils/fromHook'
import { initStore } from './utils/initStore'
import type { ActionCallback, Scope } from './types/ActionCallback'
import { capitalize } from './utils/capitalize'
import type { ExtraSettings } from './types/ExtraSettings'
import { toWideObject } from './utils/toWideObject'

// console.dir({DD:import.meta.env.})

export function createWideHook<
	State,
	StateName extends string | undefined = undefined,
	// WideStateType extends boolean | undefined = StateName extends string
	// 	? boolean
	// 	: undefined,
	_WideState = StateName extends undefined
		? WideState<State>
		: WideObject<State, NonNullable<StateName>>,
>({
	init,
	on: ACTION_CALLBACK,
	objectifyWithName: stateName,
	// stateName,
	// stateName,
}: {
	/*
	 * initial value
	 */
	init: State

	/**
	 * action callback reacts on every change of current state
	 */
	on?: ActionCallback<State>
} & ExtraSettings<StateName>) {
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

	const onNextState = (
		cb: (currentValue: State, previousValue: State) => void,
	) =>
		STORE.listen({
			next: (props) => {
				cb(props.currentValue, props.previousValue)
			},
		})

	function widehook():
		| WideState<State>
		| WideObject<State, NonNullable<StateName>> {
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
							scope,
						)
					}
				},
			})

			return () => {
				subscription.unsubscribe()
			}
		}, [])

		const setNextState: WideState<State>['1'] = (nextState: State) => {
			STORE.set(nextState)
			actionHappened = true
		}

		const arrayWideState: WideState<State> = [state, setNextState, onNextState]

		if (stateName !== undefined) {
			// if (stateName === true && stateName !== undefined) {
			return toWideObject<State, NonNullable<StateName>>(
				[stateName, state],
				[`set${capitalize(stateName)}`, setNextState],
				[`on${capitalize(stateName)}`, onNextState],
			)
			// return {
			// 	[stateName as StateName]: state,
			// 	[`set${capitalize(stateName)}`]: setNextState,
			// 	[`on${capitalize(stateName)}`]: onNextState,
			// } satisfies WideObject<State, StateName>
			// } else {
			// 	return arrayWideState
			// }
		} else {
			return arrayWideState as WideState<State>
		}
	}

	/**
	 * passing state functions into aux to use inside {@link fromHook}
	 * for accessing inside another widehook's {@link ActionCallback}
	 */

	const aux: AUX<State> = {
		state: () => STORE.value(),
		setState: (nextState: State) => {
			actionHappened = true
			STORE.set(nextState)
		},
		onNextState,
		scope,
	}

	widehook.aux = aux

	return (() => {
		try {
			return widehook()
		} catch (error) {
			if (error) {
				if (
					error
						.toString()
						.includes(
							'Invalid hook call. Hooks can only be called inside of the body of a function component',
						)
				) {
					console.info('Hook was called outside react component')
				}
			}

			if (stateName !== undefined) {
				// if (stateName === true && stateName !== undefined) {
				return fromHook(widehook, stateName)
				// } else {
				// 	return fromHook(widehook)
				// }
			} else {
				return fromHook(widehook)
			}
		}
	}) as WideHook<_WideState>
}
