import { createPassage } from 'src/passage/createPassage'
import { useNumber } from './useNumber'

export const dedupe = createPassage<string>(
	(state, setState, { previousStates: prevState }) => state !== prevState
)

export const double = createPassage(
	(state, setState, { previousStates: prevState }) => state === prevState
)

export const lengthToNumberProgression = createPassage<string>(
	(state, setState, here) => {
		const [number, setNumber] = here.fromHook(useNumber)

		if (state.length >= 5) {
			setNumber(5)
		} else if (state.length >= 8) {
			setNumber(8)
		} else {
			setNumber(15)
		}

		return state.length >= 5 ? true : false
	}
)
