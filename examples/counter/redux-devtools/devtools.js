export const ActionTypes = {
  PERFORM_ACTION: 'PERFORM_ACTION',
  RESET: 'RESET'
};

const INIT_ACTION = { type: '@@INIT' };

function wrap(reducer, initialState = reducer(undefined, INIT_ACTION)) {
  const initialDevState = {
    state: initialState,
    log: [{ state: initialState, action: INIT_ACTION }]
  };

  function performAction({ log, state }, { action }) {
    state = reducer(state, action);
    log = [...log, { state, action }];
    return { state, log };
  }

  function reset() {
    return initialDevState;
  }

  const handlers = {
    [ActionTypes.RESET]: reset,
    [ActionTypes.PERFORM_ACTION]: performAction
  };

  return function handleDevAction(devState = initialDevState, devAction) {
    if (!handlers.hasOwnProperty(devAction.type)) {
      return devState;
    }

    const nextDevState = handlers[devAction.type](devState, devAction);
    return { ...devState, ...nextDevState };
  };
}

function unwrap(devStore) {
  function getState() {
    return devStore.getState().state;
  }

  function dispatch(action) {
    devStore.dispatch({
      type: ActionTypes.PERFORM_ACTION,
      action
    });
  }

  return {
    ...devStore,
    dispatch,
    getState,
    getDevToolsStore() {
      return devStore;
    }
  };
}

export default function devtools() {
  return next => (reducer, initialState) => {
    const devReducer = wrap(reducer, initialState);
    const devStore = next(devReducer);
    const store = unwrap(devStore);
    return store;
  };
}
