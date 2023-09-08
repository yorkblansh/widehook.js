import { useToDo } from 'example/hooks/useToDo'
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
