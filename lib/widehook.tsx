import { useEffect, useState } from 'react'
import { BehaviorSubject } from 'rxjs'

interface Props<State> {
	initState: State
}

export const createWideHook = <
	State,
	HookReturnType = [State, (state: State) => void]
>({
	initState,
}: Props<State>) => {
	const subject = new BehaviorSubject(initState)

	const service = {
		emit: (state: State) => subject.next(state),
		clear: () => subject.next(undefined as any),
		on: () => subject.asObservable(),
	}

	return () => {
		const [state, setState] = useState(subject.getValue())

		useEffect(() => {
			setState(subject.getValue())
			const subscription = service.on().subscribe({
				next: (state) => {
					setState(state)
				},
				error: (error) => console.log('This is called when error occurs'),
				complete: () => console.log('This is called when subscription closed'),
			})

			return () => {
				subscription.unsubscribe()
			}
		}, [])

		return [state, (state: State) => service.emit(state)] as HookReturnType
	}
}
