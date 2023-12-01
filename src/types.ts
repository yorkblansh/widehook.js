import type { AUX } from './utils/fromHook'

export type WideHookAux<WideState> = WideHook<WideState> & {
	aux: AUX<WideState>
}

export type WideObject<State, StateName extends string> = {
	[T in StateName]: State
} & {
	[T in `set${Capitalize<StateName>}`]: (nextState: State) => void
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
