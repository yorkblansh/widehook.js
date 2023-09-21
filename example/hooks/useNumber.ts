import { createWideHook } from '@widehook'

export const usePrevNumber = createWideHook({
	init: 0,
})

export const useNumber = createWideHook({
	init: 0,
	on(number, setNumber, here) {
		const [prevNumber, setPrevState] = here.takeOtherStateByHook(usePrevNumber)
		setPrevState(here.prevStates())
	},
})
