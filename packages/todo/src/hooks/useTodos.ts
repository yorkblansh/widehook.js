import { createWideHook } from '@widehook'

interface Todo {
	id: number
	text: string
	completed: boolean
}

export const useTodos = createWideHook({
	init: [] as Todo[],
	objectifyWithName: 'todos',
	on(todos, setTodos) {
		// Сохраняем в localStorage при каждом изменении
		localStorage.setItem('todos', JSON.stringify(todos))
	},
})

// Вспомогательные функции для работы с todos
export const todoActions = {
	add: (text: string) => {
		const { todos, setTodos } = useTodos()
		setTodos([
			...todos,
			{
				id: Date.now(),
				text,
				completed: false,
			},
		])
	},

	toggle: (id: number) => {
		const { todos, setTodos } = useTodos()
		setTodos(
			todos.map((todo) =>
				todo.id === id ? { ...todo, completed: !todo.completed } : todo,
			),
		)
	},

	remove: (id: number) => {
		const { todos, setTodos } = useTodos()
		setTodos(todos.filter((todo) => todo.id !== id))
	},

	edit: (id: number, text: string) => {
		const { todos, setTodos } = useTodos()
		setTodos(todos.map((todo) => (todo.id === id ? { ...todo, text } : todo)))
	},
}
