import { useState } from 'react'
import { useText } from '../hooks/useText'

export const AnotherComponent = () => {
	const [v, setV] = useState('')
	const [text, setText] = useText()

	console.log({ v })

	return (
		<section>
			Another Component
			<button onClick={() => setText('Another Text')}>{text}</button>
		</section>
	)
}
