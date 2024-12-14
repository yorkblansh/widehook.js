import fromPairs from 'lodash.frompairs'
import type { WideObject, WideState } from '../types'

type Props<State extends any, StateName extends string> = [
	[x: StateName, WideState<State>[0]],
	[x: `set${Capitalize<StateName>}`, WideState<State>[1]],
	[x: `on${Capitalize<StateName>}`, WideState<State>[2]],
]

//TODO remove fromPairs
export const toWideObject = <State, StateName extends string>(
	...props: Props<State, StateName>
) => fromPairs(props) as WideObject<State, StateName>
