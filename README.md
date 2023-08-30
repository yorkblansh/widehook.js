# One react state everywhere

- [`mode: 'signal'`](#modes) to prevent rerenders
  <!-- - [types]() -->
    <!-- - [development](#example2) -->

<!-- ## Usage -->

### Create hook

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

    ...
}

//AnotherComponent.tsx
export const AnotherComponent = () => {
    const [message, setMessage] = useWideMessage()

    ...
}

```

### Use `signal` mode for prevent rerenders in the component

> By default `mode` is `'useState'` and behaves like a simple useState react hook

```ts
// useWideMessage.ts
import { createWideHook } from 'widehook'

export const useWideMessage = createWideHook({
	initState: 'Click' as 'One Value' | 'Another',
	mode: 'signal',
})
```

Mode built on top of [preact-signals/react](https://www.npmjs.com/package/@preact/signals-react)
