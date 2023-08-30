import { createWideHook } from 'lib/widehook.es'

export const useWideMessage = createWideHook({
	initState: 'Click' as 'One Value' | 'Another',
	mode: 'signal',
})
