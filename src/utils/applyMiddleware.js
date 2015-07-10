import compose from './compose';
import composeMiddleware from './composeMiddleware';
import thunk from '../middleware/thunk';

/**
 * Creates a higher-order store that applies middleware to a store's dispatch.
 * Because middleware is potentially asynchronous, this should be the first
 * higher-order store in the composition chain.
 * @param {...Function} ...middlewares
 * @return {Function} A higher-order store
 */
export default function applyMiddleware(...middlewares) {
  const finalMiddlewares = middlewares.length ?
    middlewares :
    [thunk];

  return next => (reducer, initialState) => {
    const store = next(reducer, initialState);
    const { dispatch, getState } = store;

    const middleware = composeMiddleware(...finalMiddlewares);
    const dispatchWithMiddleware = compose(
      middleware({ dispatch, getState }),
      dispatch
    );

    return Object.assign(Object.create(store), {
      dispatch: dispatchWithMiddleware
    });
  };
}
