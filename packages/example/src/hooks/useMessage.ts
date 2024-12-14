import { createWideHook } from '@widehook'
import { useText } from './useText'

export const useMessage = createWideHook({
	init: '',
	on(message, setMessage, { fromHook }) {
		const [text, setText] = fromHook(useText)
	},
})
