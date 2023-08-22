import { createWideHook } from 'lib/widehook.js'

export const useWideMessage = createWideHook({
	initState: 'Click' as 'One Value' | 'Another',
})
