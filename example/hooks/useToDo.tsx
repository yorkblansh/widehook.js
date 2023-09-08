import { createWideHook } from '@widehook'
import { TodoItem } from 'example/components/todo/Item'

export const useToDo = createWideHook({
	init: [{ id: 0, name: 'first', isDone: false }] as TodoItem[],
	mode: 'default',
})
