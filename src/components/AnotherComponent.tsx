import { useState } from 'react'
import { useWideMessage } from 'src/shared/hooks/useWideMessage'

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
