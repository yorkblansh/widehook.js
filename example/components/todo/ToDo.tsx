import { useToDo } from 'example/hooks/useToDo'
import { Item } from './Item'

export const ToDo = () => {
	const [todo, setToDo] = useToDo()

	return (
		<div className="todo">
			{todo.map((itemProps) => (
				<Item {...itemProps} />
			))}
		</div>
	)
}
