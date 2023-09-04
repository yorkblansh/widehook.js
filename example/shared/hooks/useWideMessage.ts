import { createWideHook } from '@widehook'
import { createEvent } from 'src/createEvent'
import { useStateByHook } from 'src/useStateByHook'

type Text = 'One Text' | 'Another TExt'

export const useText = createWideHook({
	key: 'k',
	initState: 'text' as Text,
	mode: 'signal',
	on: (text, setText) => {
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
	initState: 'Click' as Message,
	on: (m, s, { lookFor }) => {
		const [text, setText] = useStateByHook(useText)

		lookFor(
			dedupe((message) => {
				console.log({ dedupedMessage: message })
			})
		)
	},
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
