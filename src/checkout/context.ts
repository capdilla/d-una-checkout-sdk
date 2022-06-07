import State from './state';

export default class Context {
  private state: State;

  constructor(state: State) {
    this.state = state;
  }

  public getState() {
    return this.state;
  }

  public setState<K extends keyof State>(state: Pick<State, K> | State | null) {
    this.state = { ...this.state, ...state };
  }
}
