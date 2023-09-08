import { RemoveItemButton } from './RemoveItemButton'

export interface TodoItem {
	id: number
	name: string
	isDone: boolean
}

export const Item = ({ isDone, name: key }: TodoItem) => {
	return (
		<>
			<div>{key}</div>
			<div>{isDone}</div>
		</>
	)
}
