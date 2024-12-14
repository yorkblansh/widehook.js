import { useText } from 'example/hooks/useText'
import { useState } from 'react'

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
