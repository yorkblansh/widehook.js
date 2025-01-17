// type WideStateNameSettings<
// 	StateName extends string | undefined,
// 	WideStateType extends boolean | undefined = StateName extends string
// 		? boolean
// 		: undefined,
// > = {
// 	/**
// 	 * if true widehook function returns WideObject
// 	 */
// 	// returnObject?: WideStateType
// 	// stateName?: StateName

// 	objectifyWithName?: StateName
// }

// type WideStateSettings<
// 	WideStateType extends boolean | undefined,
// 	StateName extends string | undefined,
// > = StateName extends string
// 	? Required<WideStateNameSettings<StateName, WideStateType>>
// 	: WideStateNameSettings<StateName, WideStateType>

// export type ExtraSettings<
// 	WideStateType extends boolean | undefined,
// 	StateName extends string | undefined,
// > = WideStateSettings<WideStateType, StateName>

export type ExtraSettings<
	// WideStateType extends boolean | undefined,
	StateName extends string | undefined,
> = {
	objectifyWithName?: StateName
}
