import { useToDo } from 'example/hooks/useTodo'

export const Panel = () => {
	const [todo, setToDo] = useToDo()
	const visible = todo.filter((p) => p.isDone).length

	return (
		<div>
			<div>visible: {visible}</div>
			<div>total: </div>
		</div>
	)
}
