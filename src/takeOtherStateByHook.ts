import { Context, OtherWideHook, WideHook } from './types'

export interface AUX<State> {
	// key: string
	state: () => State
	setState: (nextState: State) => void
	context: Context<State>
}

export const takeOtherStateByHook = <State>(widehook: WideHook<State>) => {
	const widehookWithAux = widehook as any
	const { setState, state, context } = widehookWithAux.aux as AUX<State>

	return [state(), setState, context] as ReturnType<OtherWideHook<State>>
}
