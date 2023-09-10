import { PassageContext, OtherWideHook, WideHook } from './types'

export interface AUX<State> {
	key: string
	state: () => State
	setState: (nextState: State) => void
	passageContext: PassageContext<State>
}

export const takeOtherStateByHook = <State>(widehook: WideHook<State>) => {
	const widehookWithAux = widehook as any
	const { key, setState, state, passageContext } =
		widehookWithAux.aux as AUX<State>

	return [state, setState, passageContext] as ReturnType<OtherWideHook<State>>
}
