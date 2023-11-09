import { useCounter, useText } from 'example/hooks/useText'

export const MainComponent = () => {
	const [text, setText] = useText()

	const { counter, setCounter } = useCounter()

	return (
		<section>
			Main Component
			<button
				onClick={() => {
					setText('One Text')
					// setCounter(55)
				}}
			>
				{text}
			</button>
			<button
				onClick={() => {
					setCounter(777)
				}}
			>
				{counter}
			</button>
			<div>
				{/* <div>prev number: {prevNumber}</div> */}
				{/* <div>current number: {number}</div> */}
			</div>
		</section>
	)
}
