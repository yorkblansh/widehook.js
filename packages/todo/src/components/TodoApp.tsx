import React, { useState } from 'react'
import { useTodos, todoActions } from '../hooks/useTodos'

export const TodoApp: React.FC = () => {
	const { todos } = useTodos()
	const [newTodo, setNewTodo] = useState('')

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		if (newTodo.trim()) {
			todoActions.add(newTodo.trim())
			setNewTodo('')
		}
	}

	return (
		<div className="todo-app">
			<h1>Todo List</h1>

			<form onSubmit={handleSubmit} className="todo-form">
				<input
					type="text"
					value={newTodo}
					onChange={(e) => setNewTodo(e.target.value)}
					placeholder="What needs to be done?"
					className="todo-input"
				/>
				<button type="submit" className="todo-button">
					Add Todo
				</button>
			</form>

			<ul className="todo-list">
				{todos.map((todo) => (
					<li
						key={todo.id}
						className={`todo-item ${todo.completed ? 'completed' : ''}`}
					>
						<input
							type="checkbox"
							checked={todo.completed}
							onChange={() => todoActions.toggle(todo.id)}
							className="todo-checkbox"
						/>
						<span className="todo-text">{todo.text}</span>
						<button
							onClick={() => todoActions.remove(todo.id)}
							className="todo-delete"
						>
							Delete
						</button>
					</li>
				))}
			</ul>

			<div className="todo-stats">
				<p>Total todos: {todos.length}</p>
				<p>Completed: {todos.filter((todo) => todo.completed).length}</p>
			</div>
		</div>
	)
}
