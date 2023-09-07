import { useOtherStateByHook } from './useOtherStateByHook'

export type whEventCallback<State> = (
	state: State,
	setState: (newState: State) => void,
	here: HereContext<State>
) => void

export type whEventPredicat<State> = (
	state: State,
	setState: (newState: State) => void,
	here: HereContext<State>
) => boolean

export type HereContext<State> = {
	prevState: State
	lookFor: (eventCallback: whEventCallback<State>) => void
	useOtherStateByHook: typeof useOtherStateByHook
}

type WidehookEvent<_State> = <State extends string>(
	eventCallback: whEventCallback<State>
) => whEventCallback<State>

export const createEvent = <GenericState>(
	eventPredicat: whEventPredicat<GenericState>
) => {
	const widehookEvent = <State extends GenericState>(
		eventCallback: whEventCallback<State>
	) => {
		const widehookEventCallback = (
			...cbArgs: Parameters<whEventCallback<State>>
		) => {
			const isPredicatConditionTrue = eventPredicat(
				...(cbArgs as unknown as Parameters<whEventPredicat<GenericState>>)
			)
			if (isPredicatConditionTrue) eventCallback(...cbArgs)
		}
		return widehookEventCallback as whEventCallback<State>
	}
	return widehookEvent as WidehookEvent<GenericState>
}
