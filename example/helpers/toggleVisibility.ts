import { useToDo } from 'example/hooks/useTodo'
import { TodoItem } from 'example/interfaces/TodoItem.interface'
import _ from 'lodash'

export const toggleVisibility = (id: number) => {
	const [todo, setToDo] = useToDo()

	const item = todo.filter((p) => p.id === id)[0]
	const updatedItem = _.update(item, 'isDone', (v) => !v) as TodoItem
	setToDo(
		[...todo.filter((p) => p.id !== id), updatedItem].sort(
			(a, b) => a.id - b.id
		)
	)
}
