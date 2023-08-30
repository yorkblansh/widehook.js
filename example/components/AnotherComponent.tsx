import { useWideMessage } from 'example/shared/hooks/useWideMessage'
import { useState } from 'react'

export const AnotherComponent = () => {
	const [a, b] = useState('')

	const [message, setMessage] = useWideMessage()

	console.log({ a })

	return (
		<section>
			Another Component
			<button onClick={() => setMessage('Another')}>{message}</button>
		</section>
	)
}
