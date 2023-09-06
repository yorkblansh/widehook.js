import { createWideHook } from '@widehook'
import { createEvent } from 'src/createEvent'
import { useOtherStateByHook } from 'src/useOtherStateByHook'

type Text = 'One Text' | 'Another TExt'

export const useText = createWideHook({
	key: 'header label',
	init: 'something' as Text,
	mode: 'signal',
	on: (text, setText, { prevState }) => {
		console.log({
			logFromText: text,
		})
	},
})

export const dedupe = createEvent<string>(
	(state, setState, { prevState }) => state !== prevState
)

type Message = 'One Value' | 'Another'

export const useMessage = createWideHook({
	init: 'Click' as Message,

	on: dedupe(
		dedupe((message, setState, here) => {
			const [text, setText, here1] = useOtherStateByHook(useText)

			here.lookFor(dedupe((message) => {}))

			console.log({ dedupedMessage: message })
		})
	),
	// on: (message, setMessage, { lookFor }) => {

	// 	lookFor(
	// 		dedupe((message) => {
	// 			console.log({ dedupedMessage: message })
	// 		})
	// 	)
	// },
	mode: 'signal',

	// on: (state, setState, prevState) => {
	// 	another((state, setState, prevState) => {})(state, setState, prevState)
	// },

	// createEvent(state, () => {})
	// another(state, () => {})

	// on: (message, setMessage) => {
	// 	const [text, setText] = useStateByHook(useWideText)
	// 	if (message === 'Another')
	// 		setTimeout(() => {
	// 			setText('Another TExt')
	// 		}, 500)
	// },
})
