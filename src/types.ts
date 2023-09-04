import { Signal } from '@preact/signals-react'
import { Observable } from 'rxjs/internal/Observable'

export type UnwrapObservable<T> = T extends Observable<infer U> ? U : never

export type Modes = 'signal' | 'default'

export type HookState<T> = {
	default: T
	signal: Signal<T>
}
