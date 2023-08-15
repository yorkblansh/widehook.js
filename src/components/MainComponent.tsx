import { useWideMessage } from 'src/shared/hooks/useWideMessage'

export const MainComponent = () => {
	const [message, setMessage] = useWideMessage()

	return (
		<section>
			Main Component
			<button onClick={() => setMessage('One Value')}>{message}</button>
		</section>
	)
}
