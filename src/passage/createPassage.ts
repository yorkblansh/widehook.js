import { Scope, ActionCallback } from 'src/types'

export type PassagePredicat<State> = (
	state: State,
	setState: (newState: State) => void,
	here: Scope<State>
) => boolean

export type WidehookPassage<_State> = <State extends string>(
	passageCb: ActionCallback<State>
) => ActionCallback<State>

export const createPassage = <GenericState>(
	passagePredicat: PassagePredicat<GenericState>
) => {
	const widehookPassage = <State extends GenericState>(
		cb: ActionCallback<State>
	) => {
		const passageCb = (...args: Parameters<ActionCallback<State>>) => {
			const isConditionTrue = passagePredicat(
				...(args as unknown as Parameters<PassagePredicat<GenericState>>)
			)
			if (isConditionTrue) cb(...args)
		}
		return passageCb as ActionCallback<State>
	}
	return widehookPassage as WidehookPassage<GenericState>
}
