import { useText } from '../hooks/useText'
export const OneMoreComponent = () => {
	const [text, setText] = useText()

	return (
		<section>
			One More Component
			<button onClick={() => setText('Completely Different Text')}>
				{text}
			</button>
		</section>
	)
}
