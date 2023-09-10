import { useText } from 'example/hooks/useText'

export const OneMoreComponent = () => {
	const [text, setText] = useText()

	return (
		<section>
			Main Component
			<button onClick={() => setText('Completely Different Text')}>
				{text()}
			</button>
		</section>
	)
}
