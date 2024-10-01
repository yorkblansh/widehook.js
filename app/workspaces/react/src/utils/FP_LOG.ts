export const FP_LOG =
	(name: string, dest: "console.log" | (({}) => void)) =>
	<T>(o: T) => {
		const logObject = { [name]: o }
		dest === "console.log" ? console.log(logObject) : dest(logObject)
		return o
	}
