export interface ItemProps {
	key: string
	isDone: boolean
}

export const Item = ({ isDone, key }: ItemProps) => {
	return (
		<div className="item">
			<div>{key}</div>
			<div>{isDone}</div>
		</div>
	)
}
