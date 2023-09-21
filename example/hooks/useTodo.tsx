import { createWideHook } from '@widehook'

export interface TodoItem {
	id: number
	name: string
	isDone: boolean
}

export const useToDo = createWideHook({
	init: [{ id: 0, name: 'first', isDone: false }] as TodoItem[],
})
