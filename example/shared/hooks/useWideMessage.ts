import {
	createWideHook,
	createWidehookPlugin,
	useStateByHook,
} from '../../../src/widehook'

export const useWideText = createWideHook({
	key: 'k',
	initState: 'text' as 'One Text' | 'Another TExt',
	mode: 'signal',
	on: (text, setText) => {
		console.log({
			logFromText: text,
		})
	},
})

export const useWideMessage = createWideHook({
	initState: 'Click' as 'One Value' | 'Another',
	on: (state, s) => {
		createWidehookPlugin(state, () => {})
		another(state, () => {})
	},
	// on: (message, setMessage) => {
	// 	const [text, setText] = useStateByHook(useWideText)
	// 	if (message === 'Another')
	// 		setTimeout(() => {
	// 			setText('Another TExt')
	// 		}, 500)
	// },
})
