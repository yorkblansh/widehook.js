# One state use wide

- [`mode: 'signal'`](#modes) to prevent rerenders
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

`setMessage` will update state in both components

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

![demo](https://www.dropbox.com/scl/fi/z5pno29hhjj8i3wmsdne1/Peek-2023-09-01-14-18.gif?rlkey=i764ghcg0m81gefczce92jeo1&dl=0)

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
