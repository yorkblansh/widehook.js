import { Observable } from 'rxjs/internal/Observable'
import type { takeOtherStateByHook } from './takeOtherStateByHook'

export type UnwrapObservable<T> = T extends Observable<infer U> ? U : never

export type Modes = 'signal' | 'default'

export type WideState<State> = [() => State, (newState: State) => void]

export type OtherWideState<State> = [
	() => State,
	(newState: State) => void,
	PassageContext<State>
]

export type WideHook<State> = () => WideState<State>

export type OtherWideHook<State> = () => OtherWideState<State>

export type PassageContext<State> = {
	prevState: () => State
	lookFor: (epithetCallback: PassageCallback<State>) => void
	takeOtherStateByHook: typeof takeOtherStateByHook
}

export type PassageCallback<State> = (
	state: () => State,
	setState: (newState: State) => void,
	here: PassageContext<State>
) => void
