type WideStateNameSettings<
	WideStateType extends boolean | undefined,
	StateName extends string,
> = {
	/**
	 * if true widehook function returns WideObject
	 */
	returnObject?: WideStateType
	stateName?: StateName
}

type WideStateSettings<
	WideStateType extends boolean | undefined,
	StateName extends string,
> = WideStateType extends boolean
	? Required<WideStateNameSettings<WideStateType, StateName>>
	: WideStateNameSettings<WideStateType, StateName>

export type ExtraSettings<
	WideStateType extends boolean | undefined,
	StateName extends string,
> = WideStateSettings<WideStateType, StateName>
