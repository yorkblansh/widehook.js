export const getLatestDateInList = (a: Date[]) => {
	const maxDate = Math.max.apply(
		null,
		a.map((e) => new Date(e)),
	) as string

	return new Date(maxDate)
}
