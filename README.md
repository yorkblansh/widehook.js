
![demo](https://raw.githubusercontent.com/yorkblansh/widehook.js/master/demo/logo.png)

- [Usage](#usage)
  - [Create hook](#create-hook)
  - [Use in each component](#use-in-each-component)
  - [Use outside of component](#use-outside-of-component)
- [`on(state, setState) { }`](#onstate-setstate--)
  - [Access another state](#access-another-state)
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

### Use in each component

```ts
export const MainComponent = () => {
 const [message, setMessage] = useMessage()

 return <button onClick={() => setMessage('One Value')}>{message}</button>
}

export const AnotherComponent = () => {
 const [message, setMessage] = useMessage()

 return <button onClick={() => setMessage('Another')}>{message}</button>
}
```

![demo](https://raw.githubusercontent.com/yorkblansh/widehook.js/master/demo/demo.gif)

### Use outside of component

```ts
function setSpecialMessage(text: string) {
 const [message, setMessage] = useMessage() // widehook works everywhere

 setMessage('some text')
}
```

## `on(state, setState) { }`

On each `"setState"` you can define the action:

```ts
export const useMessage = createWideHook({
  init: 'text',
  on(message, setMessage) {
    if (message === 'specific message') console.log(message)
  },
})
```

### Access another state

Take another widehook to read and update:

```ts
export const useText = createWideHook({
  init: 'text',
  on(message, setMessage) {
    const [number, setNumber] = useNumber()
    if (message === 'specific message') setNumber(7)
  },
})
```

## TypeScript

Type declaration for init value:

```ts
type Text = 'One Text' | 'Another Text' | 'Completely Different Text'

export const useText = createWideHook({
  init: 'text' as Text,
})
```
