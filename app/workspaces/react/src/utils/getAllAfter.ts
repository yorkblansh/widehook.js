export const getAllAfter = <T>(predicat: T, array: T[]) => {
	const index = array.indexOf(predicat)
	const nextItems = array.slice(index)
	return nextItems
}
