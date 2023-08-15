import { useWideMessage } from 'src/shared/hooks/useWideMessage'

export const AnotherComponent = () => {
	const [message, setMessage] = useWideMessage()

	return (
		<section>
			Another Component
			<button onClick={() => setMessage('Another')}>{message}</button>
		</section>
	)
}
