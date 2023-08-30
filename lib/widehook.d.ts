import { Signal } from '@preact/signals-react';
type HookState<T> = {
    useState: T;
    signal: Signal<T>;
};
type Modes = 'signal' | 'useState';
export declare const createWideHook: <State, Mode extends Modes | undefined = undefined, HookReturnType = [HookState<State>[Mode extends undefined ? "useState" : Mode], (newState: State) => void]>({ initState, mode, }: {
    initState: State;
    mode?: Mode | undefined;
}) => () => HookReturnType;
export {};
