import { createWideHook } from 'lib/widehook'

export const useWideMessage = createWideHook({
	initState: 'Click' as 'One Value' | 'Another',
})
