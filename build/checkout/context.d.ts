import State from './state';
export default class Context {
    private state;
    constructor(state: State);
    getState(): State;
    setState<K extends keyof State>(state: Pick<State, K> | State | null): void;
}
