import { BehaviorSubject, map, pairwise } from 'rxjs'

export const rxService = <State>(init: State) => {
	const subject$ = new BehaviorSubject(init)
	const previousValueSubject$ = new BehaviorSubject(subject$.getValue())

	return {
		emit: (state: State) => subject$.next(state),
		on: () =>
			subject$.pipe(
				pairwise(),
				map(([prevState, state]) => {
					previousValueSubject$.next(prevState)
					return { prevState, state }
				})
			),
		value: () => subject$.getValue(),
		previousValue: () => previousValueSubject$.getValue(),
	}
}
