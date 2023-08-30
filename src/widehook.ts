import { useEffect, useState } from 'react'
import { Signal, useSignal } from '@preact/signals-react'
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject'

type HookState<T> = {
	useState: T
	signal: Signal<T>
}

type Modes = 'signal' | 'useState'

export const createWideHook = <
	State,
	Mode extends Modes | undefined = undefined,
	HookReturnType = [
		HookState<State>[Mode extends undefined ? 'useState' : Mode],
		(newState: State) => void
	]
>({
	initState,
	mode,
}: {
	initState: State
	mode?: Mode
}) => {
	const subject$ = new BehaviorSubject(initState)

	const service = {
		emit: (state: State) => subject$.next(state),
		on: () => subject$.asObservable(),
	}

	return () => {
		const [state, setState] = useState(subject$.getValue())
		const signalState = useSignal(subject$.getValue())

		const changeStateBy = (sm: typeof mode) => (state: State) => {
			if (sm === 'signal') {
				signalState.value = state
			} else {
				setState(state)
			}
		}

		useEffect(() => {
			setState(subject$.getValue())

			const subscription = service.on().subscribe({
				next: changeStateBy(mode),
				error: (error) => console.log('This is called when error occurs'),
				complete: () => console.log('This is called when subscription closed'),
			})

			return () => {
				subscription.unsubscribe()
			}
		}, [])

		const stateMap: { [each in Modes]: unknown } = {
			useState: state,
			signal: signalState,
		}

		return [
			stateMap[mode ? mode : 'useState'],
			(newState: State) => service.emit(newState),
		] as HookReturnType
	}
}
