import { createWideHook } from '@widehook'
import { useNumber } from './useNumber'

type Text = 'One Text' | 'Another Text' | 'Completely Different Text'

export const useText = createWideHook({
	init: 'Init Text' as Text,
	on: (text, setText, here) => {
		const [number, setNumber, inNumber] = here.takeOtherStateByHook(useNumber)

		// setTimeout(() => {
		// 	setText(text + '1')
		// }, 1500)
		// if (text === 'Completely Different Text') setNumber(number + 1)

		console.table({
			text,
			textPrevState: here.prevState(),
			number: number,
			numberPrevState: inNumber.prevState(),
		})
	},
})
