# Roadmap

## Planned Features

### Middleware System
The middleware system will allow intercepting and modifying state changes before they occur. This will enable:
- Validation
- Persistence (localStorage, etc.)
- Logging and debugging
- API integration
- Custom state processing

Example of planned middleware implementation:
```typescript
type Middleware<T> = (api: MiddlewareAPI<T>) => 
  (next: (state: T) => void) => (state: T) => void;

const useStore = createWideHook({
  init: initialState,
  middlewares: [
    validationMiddleware,
    persistMiddleware,
    loggerMiddleware
  ]
});
```

### Preset Combinations
Ready-to-use store creators for common use cases:

```typescript
const createFormStore = <T extends object>({
  init,
  name,
  validation,
  persist = true,
  debug = false
}: FormStoreConfig<T>) => {
  const middlewares = [
    validation && validationMiddleware,
    persist && persistMiddleware,
    debug && loggerMiddleware
  ].filter(Boolean);

  return createWideHook({
    init,
    objectifyWithName: name,
    middlewares
  });
};

// Usage example
const useLoginForm = createFormStore({
  init: { email: '', password: '' },
  name: 'loginForm',
  validation: loginValidation,
  persist: true,
  debug: process.env.NODE_ENV === 'development'
});
```

Planned presets:
- Form stores with validation and persistence
- API stores with caching and error handling
- UI state stores with undo/redo
- Authentication stores with token management
- Theme stores with system theme detection
- List stores with pagination and filtering

### Other Planned Features
- DevTools integration
- Computed values
- Batch updates optimization
- Selectors for performance
- Time-travel debugging
- State persistence
- Better TypeScript support
- Integration with popular frameworks 