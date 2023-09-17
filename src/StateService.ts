import { BehaviorSubject, map, pairwise } from 'rxjs'

export const StateService = <State>(init: State) => {
	const subject$ = new BehaviorSubject(init)
	const previousValueListSubject$ = new BehaviorSubject([subject$.getValue()])

	return {
		set: (state: State) => subject$.next(state),
		listen: subject$.pipe(
			pairwise(),
			map(([prevState, state]) => {
				const prevStatList = previousValueListSubject$.getValue()
				prevStatList.push(prevState)
				previousValueListSubject$.next(prevStatList)
				return { prevState, state }
			})
		).subscribe,
		value: () => subject$.getValue(),
		prevValues: () => previousValueListSubject$.getValue(),
	}
}
