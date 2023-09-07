import { useMessage } from 'example/shared/hooks/useWideMessage'

export const MainComponent = () => {
	const [message, setMessage] = useMessage()

	return (
		<section>
			Main Component
			<button onClick={() => setMessage('One Value')}>{message}</button>
		</section>
	)
}
