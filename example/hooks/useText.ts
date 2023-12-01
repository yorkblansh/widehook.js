import { createWideHook } from '@widehook'

type Text = 'One Text' | 'Another Text' | 'Completely Different Text'

export const useCounter = createWideHook({
	init: 3,
	returnObject: true,
	stateName: 'counter',
})

const a = useCounter()

export const useText = createWideHook({
	init: 'text' as Text,
	on(text, setText, { effect }) {
		console.log(text)

		// effect(() => {
		// 	// console.log('start')

		// 	setTimeout(() => {
		// 		setText('kkkkkkk')
		// 		setTimeout(() => {
		// 			setText('Completely Different Text')
		// 		}, 2000)
		// 	}, 2000)

		// 	return () => {
		// 		// console.log('finish')
		// 	}
		// })

		// console.log('middle')
		//  externalCall: true
		// const [number, setNumber, inNumber] = fromHook(useNumber)
		// setNumber('qqqq')
		const { counter, setCounter } = useCounter()
		if (text === 'Completely Different Text') {
			setCounter(111)
			// socket.emit('smth')
			// socket.on('smth', (data: string) => {
			// 	setNumber(data)
			// 	setText('One Text')
			// })
		}
		if (text === 'One Text') {
			setCounter(222)
			// Socket.off('jjhjkhk')
		}
		// console.log(inNumber.prevStates())
	},
})

// export const Component = () => {
// 	const [text, setText] = useText()
// 	//       ^?

// 	return <div>{text}</div>
// }

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
