import { createWideHook } from '@widehook'
// import { useNumber } from './useNumber'

type Text = 'One Text' | 'Another Text' | 'Completely Different Text'

export const useNumber = createWideHook({
	init: 7,
})

export const useText = createWideHook({
	//            ^?

	init: 'text' as Text,
	on: (message, setMessage, here) => {
		//                        ^?
		here.prevState()
		here.takeOtherStateByHook(useNumber)
		const [number, setNumber, inNumber] = here.takeOtherStateByHook(useNumber)
		//        ^?

		console.log({ prevMessage: inNumber.prevState() })
	},
})

export const Component = () => {
	const [text, setText] = useText()
	//       ^?

	return <div>{text}</div>
}

// const [number, setNumber, inNumber] = here.takeOtherStateByHook(useNumber)

// 		// setTimeout(() => {
// 		// 	setText(text + '1')
// 		// }, 1500)
// 		// if (text === 'Completely Different Text') setNumber(number + 1)

// 		console.table({
// 			text,
// 			textPrevState: here.prevState(),
// 			number: number,
// 			numberPrevState: inNumber.prevState(),
// 		})
