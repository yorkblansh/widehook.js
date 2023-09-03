import { BehaviorSubject } from 'rxjs'

const subjectMap = new Map<string, BehaviorSubject<any>>()

export const SubjectStore = {
	set: <T>(key: string, subject$: BehaviorSubject<T>) =>
		subjectMap.set(key, subject$),

	get: (key: string) => subjectMap.get(key),
}
