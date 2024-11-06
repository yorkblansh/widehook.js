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
	WideStateType extends boolean | undefined = undefined,
	StateName extends string = string,
	_WideState = WideStateType extends undefined
		? WideState<State>
		: WideObject<State, StateName>,
>({
	init,
	on: ACTION_CALLBACK,
	returnObject,
	stateName,
}: {
	/*
	 * initial value
	 */
	init: State

	/**
	 * action callback reacts on every change of current state
	 */
	on?: ActionCallback<State>
} & ExtraSettings<WideStateType, StateName>) {
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

	function widehook(): WideState<State> | WideObject<State, StateName> {
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

		if (returnObject !== undefined) {
			if (returnObject === true && stateName !== undefined) {
				return toWideObject<State, StateName>(
					[stateName, state],
					[`set${capitalize(stateName)}`, setNextState],
					[`on${capitalize(stateName)}`, onNextState],
				)
				// return {
				// 	[stateName as StateName]: state,
				// 	[`set${capitalize(stateName)}`]: setNextState,
				// 	[`on${capitalize(stateName)}`]: onNextState,
				// } satisfies WideObject<State, StateName>
			} else {
				return arrayWideState
			}
		} else {
			return arrayWideState
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

			if (returnObject !== undefined) {
				if (returnObject === true && stateName !== undefined) {
					return fromHook(widehook, stateName)
				} else {
					return fromHook(widehook)
				}
			} else {
				return fromHook(widehook)
			}
		}
	}) as WideHook<_WideState>
}
