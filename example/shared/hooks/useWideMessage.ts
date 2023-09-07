import { createWideHook } from '@widehook'
import { createEvent } from 'src/createEvent'

type Text = 'One Text' | 'Another TExt'

export const useTodo = createWideHook({
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
// inText.lookFor((text, setState) => {})
// 		setText('Another TExt')

type Action = 'One Value' | 'Another'

export const useAction = createWideHook({
	init: 'Click' as Action,
	on: (action, setAction, here) => {
		const [todo, setTodo] = here.useOtherStateByHook(useTodo)

		if (action === 'Another') {
		}
	},
})
