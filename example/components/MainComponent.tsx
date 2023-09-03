import {
	useWideMessage,
	useWideText,
} from 'example/shared/hooks/useWideMessage'

export const MainComponent = () => {
	const [message, setMessage] = useWideMessage()
	const [m, s] = useWideText()

	return (
		<section>
			Main Component
			<button onClick={() => setMessage('One Value')}>{message}</button>
			{m}
		</section>
	)
}
