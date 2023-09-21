import _ from 'lodash'
import { useState } from 'react'
import { useToDo } from 'example/hooks/useTodo'
import type { TodoItem } from 'example/hooks/useTodo'

const lastItemOf = (t: TodoItem[]) => _.maxBy(t, (t) => t.id) as TodoItem

export const ToDo = () => {
	const [newItemName, setName] = useState('')
	const [todo, setToDo] = useToDo()

	const addItem = (name: string) =>
		setToDo([
			...todo,
			{
				id: lastItemOf(todo).id + 1,
				isDone: false,
				name,
			},
		])

	const removeItem = (id: number) => setToDo(todo.filter((p) => p.id !== id))

	const toggleVisibility = (id: number) => {
		const item = todo.filter((p) => p.id === id)[0]
		const updatedItem = _.update(item, 'isDone', (v) => !v) as TodoItem
		setToDo(
			[...todo.filter((p) => p.id !== id), updatedItem].sort(
				(a, b) => a.id - b.id
			)
		)
	}

	return (
		<div className="todo">
			<div>
				<input
					type="text"
					onInput={(e) => {
						const target = e.target as unknown as { value: string }
						setName(target.value)
					}}
				/>

				{todo.map(({ id, isDone, name }, i) => (
					<div key={i} className={['item', isDone ? 'visible' : ''].join(' ')}>
						<input
							onChange={() => toggleVisibility(id)}
							type="checkbox"
							checked={isDone}
						/>

						<div>{name}</div>
						<div>{isDone}</div>

						<button onClick={() => removeItem(id)}></button>
					</div>
				))}
			</div>

			<div>
				<button onClick={() => addItem(newItemName)}>Add Item</button>
			</div>
		</div>
	)
}
