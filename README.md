![demo](https://raw.githubusercontent.com/yorkblansh/widehook.js/master/demo/logo.png)

*Instead of million state managers...*

- [Usage](#usage)
  - [Create hook](#create-hook)
  - [Use in each component](#use-in-each-component)
- [More](#more)
  - [Action callback](#action-callback)
    - [Callback context](#callback-context)
  - [Take another state](#take-another-state)
  - [Previous state](#previous-state)
    - [Previous state from another state](#previous-state-from-another-state)
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

## More

### Action callback

On each `"setState"` call inside the component you can define an action,
so in the component:

```ts
export const Component = () => {
 const [message, setMessage] = useMessage()

 return <button onClick={() => setMessage('One Value')}>{message}</button>
}

```

In the widehook:

```ts
export const useMessage = createWideHook({
  init: 'text',
  on: (message, setMessage) => {
    console.log({ message })

    if (message === 'specific message') {
      setMessage('another message')
    }
  },
})
```

#### Callback context

```ts
export const useText = createWideHook({
  init: 'text',
  on: (message, setMessage, here) => {
  //                          ^? const here: Context<Text>
  here.prevState() // access previous state
  here.takeOtherStateByHook(useNumber) allows to use another widehook inside current action callback
...
```

### Take another state

Access another state for read and update:

```ts
export const useText = createWideHook({
  init: 'text',
  on: (message, setMessage, here) => {
    const [number, setNumber] = here.takeOtherStateByHook(useNumber)

    if (message === 'specific message') {
      setNumber(7)
    }
  },
})

```

> `here` is callback context that contains stuff for accessing previous state and util for using another widehook

### Previous state

Call `prevState()` from callback context:

```ts
export const useText = createWideHook({
  init: 'text',
  on: (message, setMessage, here) => { 
      console.log({ prevMessage: here.prevState() })
  },
})
```

#### Previous state from another state

```ts
export const useText = createWideHook({
  init: 'text',
  on: (message, setMessage, here) => {
    const [number, setNumber, inNumber] = here.takeOtherStateByHook(useNumber)

    console.log({ prevMessage: inNumber.prevState() })
  },
})
```

## TypeScript

Declare a type for init value:

```ts
type Text = 'One Text' | 'Another Text' | 'Completely Different Text'

export const useNumber = createWideHook({
  init: 7,
})

export const useText = createWideHook({
  init: 'text' as Text,
  on: (message, setMessage, here) => {
    //    ^? const message: Text

    const [number, setNumber, inNumber] = here.takeOtherStateByHook(useNumber)
    //        ^? const number: number
...

export const Component = () => {
  const [text, setText] = useText()
  //       ^? const text: Text
...
```
