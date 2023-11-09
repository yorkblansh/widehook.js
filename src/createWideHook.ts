import type { WideHook, WideHookWithAux, WideState } from './types'
import { useEffect, useState } from 'react'
import { fromHook } from './utils/fromHook'
import { initStore } from './utils/initStore'
import type { ActionCallback, Scope } from './types/ActionCallback'

const capitalize = <T extends string>(s: T) =>
	(s[0].toUpperCase() + s.slice(1)) as Capitalize<typeof s>

// type Required<T> = { [P in keyof T]-?: T[P] }

// type r = Required<{ a?: string }>

// type MutableRequired<T> = { -readonly [P in keyof T]-?: T[P] } // Remove readonly and ?

// const mappedObject: Required<{a,b}> = {

// 	// requiredParam: { type: 'number' },
// 	// optionalParam: { type: 'string' },
// }

type WideStateNameSettings<WideState> = {
	widestate?: WideState
	name?: string
}

type WideStateSettings<WideState = 'object' | 'array'> =
	WideState extends 'object'
		? Required<WideStateNameSettings<WideState>>
		: WideStateNameSettings<WideState>

type ExtraSettings = WideStateSettings

export function createWideHook<State>({
	init,
	on: ACTION_CALLBACK,
	widestate,
	name,
}: {
	/*
	 * initial value
	 */
	init: State

	/**
	 * action callback reacts on every change of current state
	 */
	on?: ActionCallback<State>
} & ExtraSettings): WideHook<State> {
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

		const setNextState = (nextState: State) => {
			STORE.set(nextState)
			actionHappened = true
		}

		const arrayWideState = [state, setNextState]

		if (widestate !== undefined) {
			if (widestate === 'array') {
				return arrayWideState
			}
			if (widestate === 'object' && name != undefined) {
				return {
					[`${name}` as typeof name]: state,
					[`set${capitalize(name)}`]: setNextState,
				}
			}
		} else {
			return arrayWideState as WideState<State>
		}
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
			return widehook() as unknown as WideStateSettings<State>
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
