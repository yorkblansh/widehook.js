import { createWideHook } from '@widehook'
import { createEvent } from 'src/createEvent'

type Text = 'One Text' | 'Another TExt'

export const useText = createWideHook({
	init: 'text' as Text,
})
// 	key: 'header label',
// 	init: 'something' as Text,
// 	mode: 'signal',
// 	on: (text, setText, { prevState }) => {
// 		console.log({
// 			logFromText: text,
// 		})
// 	},
// })
// on: dedupe(
//   dedupe((message, setState, here) => {
//     const [text, setText] = here.useOtherStateByHook(useText)

//     here.lookFor(dedupe((message) => {}))

//     console.log({ dedupedMessage: message })
//   })
// ),

export const dedupe = createEvent<string>(
	(state, setState, { prevState }) => state !== prevState
)

// here.lookFor(
// 	dedupe(
// 		dedupe((state) => {
// 			setText('Another TExt')
// 		})
// 	)
// )

type Message = 'One Value' | 'Another'

export const useMessage = createWideHook({
	init: 'Click' as Message,
	on: (message, setMessage, here) => {
		const [text, setText, inText] = here.useOtherStateByHook(useText)
		inText.lookFor((text, setState) => {})
		setText('Another TExt')

		// setTimeout(() => {
		// 	console.log({ message, text })
		// }, 900)
	},
	mode: 'signal',
})
