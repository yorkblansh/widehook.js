import { useAction } from 'example/shared/hooks/useWideMessage'
import { useState } from 'react'

export const AnotherComponent = () => {
	const [a, b] = useState('')

	const [message, setMessage] = useAction()

	console.log({ a })

	return (
		<section>
			Another Component
			<button onClick={() => setMessage('Another')}>{message}</button>
		</section>
	)
}
