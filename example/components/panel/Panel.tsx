import { useToDo } from 'example/hooks/useTodo'

export const Panel = () => {
	const [todo, setToDo] = useToDo()
	const done = todo.filter((p) => p.isDone).length

	return (
		<div>
			<div>done: {done}</div>
			<div>total: {todo.length}</div>
		</div>
	)
}
