import { Context, OtherWideHook, WideHook, WideHookWithAux } from './types'

export interface AUX<State> {
	state: () => State
	setState: (nextState: State) => void
	context: Context<State>
}

/**
 * #### take other widehook to access it`s state in current callback:
 *
 * ```ts
const useNumber = createWideHook({
     init: 7,
})

const useText = createWideHook({
     init: 'text',
     on: (text, setText, here) => {
       const [number, setNumber] = here.takeOtherStateByHook(useNumber)
     },
})
 * ```
 *
 * ---
 * @returns array with `[state, setState, action]` similar to action callback props
 */
export const takeOtherStateByHook = <State>(widehook: WideHook<State>) => {
	const widehookWithAux = widehook as WideHookWithAux<State>
	const { setState, state, context: action } = widehookWithAux.aux

	return [state(), setState, action] as ReturnType<OtherWideHook<State>>
}
