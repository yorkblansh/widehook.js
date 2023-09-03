import { Observable } from 'rxjs/internal/Observable'
import type { takeOtherStateByHook } from './takeOtherStateByHook'

export type UnwrapObservable<T> = T extends Observable<infer U> ? U : never

export type Modes = 'signal' | 'default'

export type OtherWideState<State> = [
	State,
	(newState: State) => void,
	Context<State>
]

export type OtherWideHook<State> = () => OtherWideState<State>

export type Context<State> = {
	prevState: () => State
	// lookFor: (epithetCallback: PassageCallback<State>) => void
	takeOtherStateByHook: typeof takeOtherStateByHook
}

export type PassageCallback<State> = (
	state: State,
	setState: (newState: State) => void,
	here: Context<State>
) => void

export type WideHook<State> = () => WideState<State>

export type WideState<State> = [State, (newState: State) => void]
