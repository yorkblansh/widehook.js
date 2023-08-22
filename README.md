# widehook

#### Use global state over components

### Create hook
```ts
// useWideMessage.ts
import { createWideHook } from 'widehook'

export const useWideMessage = createWideHook({
    initState: 'Click' as 'One Value' | 'Another',
})
```

### Use in each component

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

/* setMessage updates state in both components
```