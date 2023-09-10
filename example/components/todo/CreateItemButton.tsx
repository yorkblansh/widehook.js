import { useToDo } from 'example/hooks/useTodo'
import { useState } from 'react'

interface Props {
	onCLick: () => void
}

export const RRRRItemButton = ({ onCLick }: Props) => {
	// const [a, b] = useState('')

	return (
		<div>
			<button onClick={onCLick}>Add Item</button>
		</div>
	)
}
