import { useToDo } from 'example/hooks/useTodo'

export const removeItem = (id: number) => {
	const [todo, setToDo] = useToDo()

	return setToDo(todo.filter((p) => p.id !== id))
}
