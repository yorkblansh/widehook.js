import { useNumber, usePrevNumber } from 'example/hooks/useNumber'
import { useText } from 'example/hooks/useText'

export const MainComponent = () => {
	const [text, setText] = useText()
	const [prevNumber, setPrevNumber] = usePrevNumber()
	const [number, setNumber] = useNumber()

	return (
		<section>
			Main Component
			<button onClick={() => setText(text + 1)}>{text}</button>
			<div>
				<div>prev number: {prevNumber}</div>
				<div>current number: {number}</div>
			</div>
		</section>
	)
}
