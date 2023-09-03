![demo](https://raw.githubusercontent.com/yorkblansh/widehook.js/master/demo/logo.png)

- [`mode: 'signal'`](#use-signal-mode-for-prevent-rerenders-in-the-component) to prevent rerenders
  <!-- - [types]() -->
    <!-- - [development](#example2) -->

<!-- ## Usage -->

### Create hook

Use `as SomeType` to give the state a type

```ts
// useWideMessage.ts
import { createWideHook } from 'widehook'

export const useWideMessage = createWideHook({
  initState: 'Click' as 'One Value' | 'Another',
})
```

### Use in each component

`setMessage` will update `message` state in both components

```ts
//MainComponent.tsx
export const MainComponent = () => {
 const [message, setMessage] = useWideMessage()

 return <button onClick={() => setMessage('One Value')}>{message}</button>
}

//AnotherComponent.tsx
export const AnotherComponent = () => {
 const [message, setMessage] = useWideMessage()

 return <button onClick={() => setMessage('Another')}>{message}</button>
}
```

![demo](https://raw.githubusercontent.com/yorkblansh/widehook.js/master/demo/demo.gif)

### Use `signal` mode for prevent rerenders in the component

> By default `mode` is `'useState'` and it behaves like a simple useState react hook

```ts
// useWideMessage.ts
import { createWideHook } from 'widehook'

export const useWideMessage = createWideHook({
 initState: 'Click' as 'One Value' | 'Another',
 mode: 'signal',
})
```

Mode built on top of [preact-signals/react](https://www.npmjs.com/package/@preact/signals-react)
