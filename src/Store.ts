import { BehaviorSubject, Observer, map, pairwise } from 'rxjs'

export class Store<State> {
	private subject$: BehaviorSubject<State>
	private previousValueListSubject$: BehaviorSubject<State[]>

	constructor(init: State) {
		this.subject$ = new BehaviorSubject(init)
		this.previousValueListSubject$ = new BehaviorSubject([
			this.subject$.getValue(),
		])
	}

	set(state: State) {
		setTimeout(() => {
			this.subject$.next(state)
		}, 1)
	}

	listen = (
		callbacks: Partial<Observer<{ prevState: State; state: State }>>
	) => {
		return this.subject$
			.pipe(
				pairwise(),
				map(([prevState, state]) => {
					const prevStateList = this.previousValueListSubject$.getValue()
					prevStateList.push(prevState)

					this.previousValueListSubject$.next(prevStateList)

					return { prevState, state }
				})
			)
			.subscribe(callbacks)
	}

	value() {
		return this.subject$.getValue()
	}

	prevValues() {
		return this.previousValueListSubject$.getValue()
	}
}

// export const StateService = <State>(init: State) => {
// 	const subject$ = new BehaviorSubject(init)
// 	const previousValueListSubject$ = new BehaviorSubject([subject$.getValue()])

// 	return {
// 		set: (state: State) => subject$.next(state),
// 		listen: subject$.pipe(
// 			pairwise(),
// 			map(([prevState, state]) => {
// 				const prevStatList = previousValueListSubject$.getValue()
// 				prevStatList.push(prevState)
// 				previousValueListSubject$.next(prevStatList)
// 				return { prevState, state }
// 			})
// 		).subscribe,
// 		value: () => subject$.getValue(),
// 		prevValues: () => previousValueListSubject$.getValue(),
// 	}
// }
