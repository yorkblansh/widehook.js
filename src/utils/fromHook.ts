import type { WideHook, WideHookAux, WideObject, WideState } from '../types'
import type { Scope } from '../types/ActionCallback'
import { capitalize } from './capitalize'

export interface AUX<State> {
	state: () => State
	setState: (nextState: State) => void
	scope: Scope
}

export const fromHook = <State, StateName extends string>(
	widehook: WideHook<State>,
	objectStateName?: StateName
) => {
	const widehookAux = widehook as WideHookAux<State>
	const { state, setState } = widehookAux.aux

	const setNextState: WideState<State>['1'] = (state) => {
		setState(state)
	}

	if (objectStateName) {
		return {
			[objectStateName as StateName]: state,
			[`set${capitalize(objectStateName)}` as Capitalize<StateName>]:
				setNextState,
		} as WideObject<State, StateName>
	} else {
		return [state(), setNextState] as WideState<State>
	}
}
