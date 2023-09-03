import { useEffect, useState } from 'react'
import { Signal, useSignal } from '@preact/signals-react'
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject'

type HookState<T> = {
	useState: T
	signal: Signal<T>
}

interface AUX<State> {
	key: string
	state: () => State
	setState: (nextState: State) => void
}

type Modes = 'signal' | 'useState'

//TODO Widehook plugin constructor
export const createWidehookPlugin =
	<T extends unknown>(
		cb: (state: T, setState: (nextState: T) => void) => void
	) =>
	(state: T, setState?: (nextState: T) => void) =>
		cb(state, setState)

export const useStateByHook = <
	State,
	Mode extends Modes | undefined = undefined,
	HookReturnType = [
		HookState<State>[Mode extends undefined ? 'useState' : Mode],
		(newState: State) => void
	],
	WideHook extends (...args: any) => any = () => HookReturnType
>(
	widehook: WideHook
) => {
	const widehookWithAux = widehook as any
	const { key, setState, state } = widehookWithAux.aux as AUX<State>

	return [state(), setState] as ReturnType<WideHook>
}

export const createWideHook = <
	State,
	Mode extends Modes | undefined = undefined,
	HookReturnType = [
		HookState<State>[Mode extends undefined ? 'useState' : Mode],
		(newState: State) => void
	],
	WideHook = () => HookReturnType
>({
	key,
	initState,
	mode,
	on,
}: {
	key?: string
	initState: State
	mode?: Mode
	on?: (state: State, setState: (newState: State) => void) => void
}) => {
	const subject$ = new BehaviorSubject(initState)

	const service = {
		emit: (state: State) => subject$.next(state),
		on: () => subject$.asObservable(),
		value: () => subject$.getValue(),
	}

	const sub = service.on().subscribe({
		next: () => {
			if (on) {
				on(service.value(), (state) => {
					if (service.value() !== state) {
						setTimeout(() => service.emit(state), 1)
					}
				})
			}
		},
	})

	const widehook = () => {
		const [state, setState] = useState(service.value())
		const signalState = useSignal(service.value())

		useEffect(() => {
			setState(service.value())

			//TODO getStateByMode
			const setStateByMode = (nextState: State) => {
				if (mode === 'signal') {
					signalState.value = nextState
				} else {
					setState(nextState)
				}
			}

			const handleState = (nextState: State) => {
				setStateByMode(nextState)
			}

			const subscription = service.on().subscribe({
				next: handleState,
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

		const finalState = stateMap[mode ? mode : 'useState']

		return [
			finalState,
			(newState: State) => service.emit(newState),
		] as HookReturnType
	}

	widehook.aux = {
		key,
		state: service.value,
		setState: service.emit,
	}

	return widehook as WideHook
}
