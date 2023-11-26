type after = () => void

export type Scope = {
	// prevStates: () => State[]

	/**
 * #### Takes another widehook to access it`s state in current callback:
 *
 * ```ts
const useNumber = createWideHook({
     init: 7,
})

const useText = createWideHook({
     init: 'text',
     on(text, setText, { fromHook }) {
       const [number, setNumber] = fromHook(useNumber)
     },
})
 * ```
 *
 * ---
 * @returns array with `[state, setState]` similar to action callback props
 */
	// fromHook: typeof fromHook

	/**
   *
   * #### This code will not loop:
 * ```ts
export const useNumber = createWideHook({
       init: 3,
       on(state, setNumber, { effect }) {
         effect(() => {
           setTimeout(() => {
             setNumber(4) // first set
             setTimeout(() => {
               setNumber(5) // second and last set
             }, 2000)
           }, 2000)
         })

       console.log(state)
       },
})
```

---



 * #### But this will:
```ts
export const useNumber = createWideHook({
       init: 3,
       on(state, setNumber) {
         setTimeout(() => {
           setNumber(4) // fisrt
           setTimeout(() => {
             setNumber(5) // second and not last
           }, 2000)
         }, 2000)

         console.log(state)
       },
})

 * ```
  * //TODO must be completed
  * @param effect setup runs code only by `setState` inside component,
  * so code will be ignored by
  * @returns
  */
	effect: (effect: () => after | void) => void
}

export type ActionCallback<State> = (
	state: State,
	setState: (newState: State) => void,
	scope: Scope
) => void
