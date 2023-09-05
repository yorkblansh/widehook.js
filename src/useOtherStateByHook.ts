import { WideHook } from './createWideHook'
import { HookState, Modes } from './types'

interface AUX<State> {
	key: string
	state: () => State
	setState: (nextState: State) => void
}

export const useOtherStateByHook = <
	State,
	Mode extends Modes | undefined = undefined,
	HookReturnType = [
		HookState<State>[Mode extends undefined ? 'default' : Mode],
		(newState: State) => void
	]
	// WideHook extends (...args: any) => any = () => HookReturnType
>(
	widehook: WideHook<State, Mode>
) => {
	const widehookWithAux = widehook as any
	const { key, setState, state } = widehookWithAux.aux as AUX<State>

	return [state(), setState] as ReturnType<WideHook<State, Mode>>
}
