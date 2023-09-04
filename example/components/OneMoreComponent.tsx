import { useMessage, useText } from 'example/shared/hooks/useWideMessage'

export const OneMoreComponent = () => {
	const [message, setMessage] = useMessage()
	const [m, s] = useText()

	return (
		<section>
			Main Component
			<button onClick={() => setMessage('One Value')}>{message}</button>
			{m}
		</section>
	)
}
