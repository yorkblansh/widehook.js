import { useText } from 'example/hooks/useText'

export const MainComponent = () => {
	const [text, setText] = useText()

	return (
		<section>
			Main Component
			<button onClick={() => setText('One Text')}>{text()}</button>
		</section>
	)
}
