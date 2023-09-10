import { _rxService } from 'src/_rxService'
import { takeOtherStateByHook } from 'src/takeOtherStateByHook'
import { PassageCallback, PassageContext } from 'src/types'

export const _createPassageContext = <State>(
	rxService: ReturnType<typeof _rxService<State>>
) => {
	const lookFor: (passageCb: PassageCallback<State>) => void = (passageCb) => {
		passageCb(
			rxService.value,
			(state) => {
				if (rxService.value() !== state) {
					setTimeout(() => rxService.emit(state), 1)
				}
			},
			passageContext
		)
	}

	const passageContext: PassageContext<State> = {
		lookFor,
		prevState: rxService.previousValue,
		takeOtherStateByHook,
	}

	return passageContext
}
