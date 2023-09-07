import { createWideHook } from '@widehook'
import { ItemProps } from 'example/components/todo/Item'

export const useToDo = createWideHook({
	init: [{ key: 'first', isDone: false }] as ItemProps[],
})
