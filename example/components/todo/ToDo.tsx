import _ from 'lodash'
import { useState } from 'react'
import { useToDo } from 'example/hooks/useTodo'
import { toggleVisibility } from '../../helpers/toggleVisibility'
import { removeItem } from 'example/helpers/removeItem'
import { addItem } from 'example/helpers/addItem'

export const ToDo = () => {
	const [newItemName, setName] = useState('')
	const [todo] = useToDo()

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
