export type whEventCallback<State> = (
	state: State,
	setState: (newState: State) => void,
	here: HereStuff<State>
) => void

export type whEventPredicat<State> = (
	state: State,
	setState: (newState: State) => void,
	here: HereStuff<State>
) => boolean

type HereStuff<State> = {
	prevState: State
	lookFor: (event: whEventCallback<State>) => void
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
