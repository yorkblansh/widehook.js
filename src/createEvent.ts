export type HookEventParams<State, EventReturn> = (
	state: State,
	setState: (newState: State) => void,
	here: HookEventHelpers<State>
) => EventReturn

type HookEventHelpers<State> = {
	prevState: State
	lookFor: (event: HookEvent<State>) => void
}

export type HookEvent<State> = (
	state: State,
	setState: (newState: State) => void,
	here: HookEventHelpers<State>
) => void

export const createEvent =
	<_State>(cbPredicat: HookEventParams<_State, boolean>) =>
	<State extends _State>(cbEvent: HookEventParams<State, void>) =>
	(...cbArgs: Parameters<HookEventParams<State, boolean>>) => {
		const isEventHappened = cbPredicat(
			...(cbArgs as unknown as Parameters<HookEventParams<_State, boolean>>)
		)
		if (isEventHappened) cbEvent(...cbArgs)
	}
