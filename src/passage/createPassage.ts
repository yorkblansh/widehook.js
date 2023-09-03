import { Context, PassageCallback } from 'src/types'

export type PassagePredicat<State> = (
	state: State,
	setState: (newState: State) => void,
	here: Context<State>
) => boolean

export type WidehookPassage<_State> = <State extends string>(
	passageCb: PassageCallback<State>
) => PassageCallback<State>

export const createPassage = <GenericState>(
	passagePredicat: PassagePredicat<GenericState>
) => {
	const widehookPassage = <State extends GenericState>(
		cb: PassageCallback<State>
	) => {
		const passageCb = (...args: Parameters<PassageCallback<State>>) => {
			const isConditionTrue = passagePredicat(
				...(args as unknown as Parameters<PassagePredicat<GenericState>>)
			)
			if (isConditionTrue) cb(...args)
		}
		return passageCb as PassageCallback<State>
	}
	return widehookPassage as WidehookPassage<GenericState>
}
