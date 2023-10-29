import { createWideHook } from '@widehook'
import { TodoItem } from 'example/interfaces/TodoItem.interface'

export const useToDo = createWideHook({
	init: [{ id: 0, name: 'first', isDone: false }] as TodoItem[],
})
