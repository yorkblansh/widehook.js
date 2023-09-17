import { Observable } from 'rxjs/internal/Observable'
import type { takeOtherStateByHook } from './takeOtherStateByHook'

export type UnwrapObservable<T> = T extends Observable<infer U> ? U : never

export type OtherWideState<State> = [
	State,
	(newState: State) => void,
	ActionContext<State>
]

export type OtherWideHook<State> = () => OtherWideState<State>

export type ActionContext<State> = {
	prevStates: () => State[]
	takeOtherStateByHook: typeof takeOtherStateByHook
}

export type ActionCallback<State> = (
	state: State,
	setState: (newState: State) => void,
	context: ActionContext<State>
) => void

export type WideHook<State> = () => WideState<State>

export type WideState<State> = [State, (newState: State) => void]
