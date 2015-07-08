import Store from './Store';
import combineReducers from './utils/combineReducers';

export default function createStore(reducer) {
  const finalReducer = typeof reducer === 'function' ?
    reducer :
    combineReducers(reducer);

  // TODO: initial state
  const store = new Store(finalReducer);

  return {
    dispatch: ::store.dispatch,
    subscribe: ::store.subscribe,
    getState: ::store.getState,
    getReducer: ::store.getReducer,
    replaceReducer: ::store.replaceReducer
  };
}
