import { createWideHook } from 'lib/widehook.umd'

export const useWideMessage = createWideHook({
	initState: 'Click' as 'One Value' | 'Another',
})
