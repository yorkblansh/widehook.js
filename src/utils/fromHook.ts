import type { WideHook, WideHookAux, WideObject, WideState } from '../types'
import type { Scope } from '../types/ActionCallback'
import { capitalize } from './capitalize'
import { toWideObject } from './toWideObject'

export interface AUX<State> {
	state: () => State
	setState: (nextState: State) => void
	onNextState: (cb: (props: State) => void) => void
	scope: Scope
}

export const fromHook = <State, StateName extends string>(
	widehook: WideHook<State>,
	objectStateName?: StateName,
) => {
	const widehookAux = widehook as WideHookAux<State>
	const { state, setState, onNextState } = widehookAux.aux

	const setNextState: WideState<State>['1'] = (state) => {
		setState(state)
	}

	if (objectStateName) {
		return toWideObject<State, StateName>(
			[objectStateName, state() as State],
			[`set${capitalize(objectStateName)}`, setNextState],
			[`on${capitalize(objectStateName)}`, onNextState],
		)
	} else {
		return [state(), setNextState, onNextState] as WideState<State>
	}
}
