<h1>widehook.js</h1>

<p align="center">
  <img src="https://raw.githubusercontent.com/yorkblansh/widehook.js/master/demo/new_logo.png" alt="Sublime's custom image"/>
</p>

- [Create](#create)
- [Use inside component](#use-inside-component)
- [Or even outside](#or-even-outside)
- [Hook options](#hook-options)
  - [`objectifyWithName: "stateName"`](#objectifywithname-statename)
  - [`on(state, setState) { }`](#onstate-setstate--)
    - [Access another state](#access-another-state)

## Create

<!-- Create wide hook with initial value -->

```ts
import { createWideHook } from 'widehook'

export const useMessage = createWideHook({
  init: 'text',
})
```

## Use inside component

```ts
const Button = () => {
  const [message, setMessage] = useMessage()
  
  const click = () => setMessage('One Value')

  return <button onClick={click}>
      {message}
  </button>
}
```

## Or even outside

```ts
const setSpecialMessage = (text: string) => {
  const [message, setMessage] = useMessage() 

  setMessage(text)
}
```

<!-- ![demo](https://raw.githubusercontent.com/yorkblansh/widehook.js/master/demo/11.gif) -->

## Hook options

### `objectifyWithName: "stateName"`

If set - hook returns an object with named props and methods:

```ts
const useCounter = createWideHook({
  init: 3,
  objectifyWithName: 'counter', 
})

...

const { counter, setCounter } = useCounter()
```
---

### `on(state, setState) { }`

On each `"setState"` define action:

```ts
export const useMessage = createWideHook({
  init: 'text',
  on(text, setText) {
    if (text === 'specific message') setText('another text')
  },
})
```

#### Access another state

Take another widehook to read and update:

```ts
export const useText = createWideHook({
  init: 'text',
  on(text, setText) {
    const [number, setNumber] = useNumber()
    if (text === 'specific text') setNumber(7)
  },
})
```



