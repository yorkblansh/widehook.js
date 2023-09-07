import { useMessage } from 'example/shared/hooks/useWideMessage'

export const OneMoreComponent = () => {
	const [message, setMessage, here] = useMessage()

	return (
		<section>
			Main Component
			<button onClick={() => setMessage('One Value')}>{message}</button>
		</section>
	)
}
