import { HereContext } from './createEvent'
import { OtherWideHook, WideHook } from './createWideHook'
import { Modes } from './types'

export interface AUX<State> {
	key: string
	state: () => State
	setState: (nextState: State) => void
	hereStuff: HereContext<State>
}

export const useOtherStateByHook = <
	State
	// Mode extends Modes | undefined = undefined
>(
	widehook: WideHook<State>
) => {
	const widehookWithAux = widehook as any
	const { key, setState, state, hereStuff } = widehookWithAux.aux as AUX<State>

	return [state(), setState, hereStuff] as ReturnType<OtherWideHook<State>>
}
