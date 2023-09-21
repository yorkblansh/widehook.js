import { BehaviorSubject, map, pairwise } from 'rxjs'
import type { Observer } from 'rxjs'

/**
 * Function stores value for certain created widehook
 * @param init init value to store
 * @returns store methods
 */
export const initStore = <T>(init: T) => {
	const value$ = new BehaviorSubject(init)
	// const previousValues: Value[] = []

	return {
		set: (nextValue: T) => value$.next(nextValue),
		listen: (
			callbacks: Partial<Observer<{ previousValue: T; currentValue: T }>>
		) =>
			value$
				.pipe(
					pairwise(),
					map(([previousValue, currentValue]) => {
						// console.log({ currentValue })
						// if (previousValue !== previousValues[previousValues.length - 1]) {
						// previousValues.push(previousValue)
						// }

						return { previousValue, currentValue }
					})
				)
				.subscribe(callbacks),
		value: () => value$.getValue(),
		// previousValues: () => previousValues,
	}
}
