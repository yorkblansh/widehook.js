import { useNumber, useText } from 'example/hooks/useText'

export const MainComponent = () => {
	const [text, setText] = useText()
	const [number, setNumber] = useNumber()

	return (
		<section>
			Main Component
			<button onClick={() => setText('One Text')}>{text}</button>
			<button
				onClick={() => {
					// setNumber('klklk')
				}}
			>
				{number}
			</button>
			<div>
				{/* <div>prev number: {prevNumber}</div> */}
				{/* <div>current number: {number}</div> */}
			</div>
		</section>
	)
}
