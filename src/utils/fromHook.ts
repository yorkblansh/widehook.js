import type { OtherWideHook, WideHook, WideHookWithAux } from '../types'
import type { Scope } from '../types/ActionCallback'

export interface AUX<State> {
	state: () => State
	setState: (nextState: State) => void
	scope: Scope
}

export const fromHook = <State>(
	widehook: WideHook<State>
): ReturnType<OtherWideHook<State>> => {
	const widehookWithAux = widehook as WideHookWithAux<State>
	const { state, setState } = widehookWithAux.aux

	return [
		state(),
		(state) => {
			setState(state)
		},
	]
}
