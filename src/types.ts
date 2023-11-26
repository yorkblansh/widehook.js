import type { AUX } from './utils/fromHook'

export type WideHookAux<WideState> = WideHook<WideState> & {
	aux: AUX<WideState>
}

export type WideObject<State, Name extends string> = {
	[T in Name]: State
} & {
	[T in `set${Capitalize<Name>}`]: (nextState: State) => void
}

export type WideState<State> = [State, (newState: State) => void]

export type WideHook<WideState> = () => WideState

// export type OtherWideState<State> = [
// 	State,
// 	(newState: State) => void
// 	// OtherContext<State>
// ]

// export type OtherWideHook<State> = () => OtherWideState<State>

// export type OtherContext<State> = undefined
// Pick<Scope<State>, undefined>
