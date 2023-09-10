import { createWideHook } from '@widehook'
import { double } from './passages'
import { useNumber } from './useNumber'

type Text = 'One Text' | 'Another Text' | 'Completely Different Text'

export const useText = createWideHook({
	init: 'Init Text' as Text,
	on: (text, setText, here) => {
		const [number, setNumber, inNumber] = here.takeOtherStateByHook(useNumber)

		if ((text() as string) === 'Init Text') setNumber(1)

		here.lookFor(double(() => setNumber(2)))

		setTimeout(() => {
			setNumber(3)
		}, 1000)

		console.table({
			text: text(),
			textPrevState: here.prevState(),
			number: number(),
		})
	},
})
