import type { AUX } from './utils/fromHook'

export type WideHookWithAux<State> = WideHook<State> & { aux: AUX<State> }

export type WideStateObject<State, Name> = {
	[x: `${Name}`]: State
	,[each in keyof Name]: (newState: State) => void
}

export type WideState<State> = [State, (newState: State) => void]

export type WideHook<State> = () => WideState<State>

export type OtherWideState<State> = [
	State,
	(newState: State) => void
	// OtherContext<State>
]

export type OtherWideHook<State> = () => OtherWideState<State>

// export type OtherContext<State> = undefined
// Pick<Scope<State>, undefined>
