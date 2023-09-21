import { Observable } from 'rxjs/internal/Observable'
import type { AUX, takeOtherStateByHook } from './takeOtherStateByHook'

export type WideHookWithAux<State> = WideHook<State> & { aux: AUX<State> }

export type UnwrapObservable<T> = T extends Observable<infer U> ? U : never

export type OtherWideState<State> = [
	State,
	(newState: State) => void,
	Context<State>
]

export type OtherWideHook<State> = () => OtherWideState<State>

export type Context<State> = {
	prevStates: () => State[]

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
 * @returns array with `[state, setState, context]` similar to action callback props
 */
	takeOtherStateByHook: typeof takeOtherStateByHook
}

export type ActionCallback<State> = (
	state: State,
	setState: (newState: State) => void,
	context: Context<State>
) => void

export type WideHook<State> = () => WideState<State>

export type WideState<State> = [State, (newState: State) => void]
