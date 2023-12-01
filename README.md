
<p align="center">
  <img src="https://raw.githubusercontent.com/yorkblansh/widehook.js/master/demo/new_logo.png" alt="Sublime's custom image"/>
</p>

- [Usage](#usage)
  - [Create hook](#create-hook)
  - [Use in component](#use-in-component)
  - [Or even outside](#or-even-outside)
- [Options](#options)
  - [`on(state, setState) { }`](#onstate-setstate--)
    - [Access another state](#access-another-state)
  - [`returnObject: true`](#returnobject-true)
- [TypeScript](#typescript)

## Usage

### Create hook

<!-- Create wide hook with initial value -->

```ts
import { createWideHook } from 'widehook'

export const useMessage = createWideHook({
  init: 'text',
})
```

### Use in component

```ts
const Button = () => {
  const [message, setMessage] = useMessage()

  return <button onClick={() => setMessage('One Value')}>
      {message}
  </button>
}
```

![demo](https://raw.githubusercontent.com/yorkblansh/widehook.js/master/demo/11.gif)

### Or even outside

```ts
const setSpecialMessage = (text: string) => {
  const [message, setMessage] = useMessage() // yes, it works here

  setMessage(text)
}
```

## Options

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

### `returnObject: true`

If true - hook returns an object with named props and methods:

```ts
const useCounter = createWideHook({
  init: 3,
  returnObject: true,
  name: 'counter', // requires name
})

const { counter, setCounter } = useCounter()
```

## TypeScript

Type declaration for init value:

```ts
type Text = 'One Text' | 'Another Text' | 'Completely Different Text'

export const useText = createWideHook({
  init: 'text' as Text,
})
```
