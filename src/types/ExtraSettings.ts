type WideStateNameSettings<
	WideStateType extends boolean | undefined,
	Name extends string
> = {
	/**
	 * if true widehook function returns WideObject
	 */
	returnObject?: WideStateType
	name?: Name
}

type WideStateSettings<
	WideStateType extends boolean | undefined,
	Name extends string
> = WideStateType extends boolean
	? Required<WideStateNameSettings<WideStateType, Name>>
	: WideStateNameSettings<WideStateType, Name>

export type ExtraSettings<
	WideStateType extends boolean | undefined,
	Name extends string
> = WideStateSettings<WideStateType, Name>
