import { useToDo } from 'example/hooks/useTodo'
import { TodoItem } from 'example/interfaces/TodoItem.interface'
import _ from 'lodash'

export const addItem = (name: string) => {
	const [todo, setToDo] = useToDo()

	const lastItemOf = (t: TodoItem[]) => _.maxBy(t, (t) => t.id) as TodoItem

	return setToDo([
		...todo,
		{
			id: lastItemOf(todo).id + 1,
			isDone: false,
			name,
		},
	])
}
