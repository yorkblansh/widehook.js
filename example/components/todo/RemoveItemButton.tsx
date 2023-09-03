import { useToDo } from 'example/hooks/useTodo'

interface Props {
	onCLick: React.MouseEventHandler<HTMLButtonElement>
}

export const RemoveItemButton = ({ onCLick }: Props) => {
	return <button onClick={onCLick}></button>
}
