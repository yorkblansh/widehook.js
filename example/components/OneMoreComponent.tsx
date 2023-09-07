import { useAction } from 'example/shared/hooks/useWideMessage'

export const OneMoreComponent = () => {
	const [message, setMessage] = useAction()

	return (
		<section>
			Main Component
			<button onClick={() => setMessage('One Value')}>{message}</button>
		</section>
	)
}
