import { useCounter, useText } from 'example/hooks/useText'
import { useEffect } from 'react'

export const MainComponent = () => {
	const [text, setText, kkk] = useText()
	const { counter, setCounter, onCounter } = useCounter()

	useEffect(() => {
		kkk((a) => {
			console.log({ a })
		})

		// onCounter((n) => {
		// 	console.log({ n })
		// })
	}, [])

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
