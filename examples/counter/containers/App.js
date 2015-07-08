import React from 'react';
import CounterApp from './CounterApp';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { Provider } from 'redux/react';
import * as reducers from '../reducers';

import DebugPanel from '../redux-devtools/DebugPanel';
import devtools from '../redux-devtools/devtools';
import ReduxMonitor from '../redux-devtools/ReduxMonitor';

const finalCreateStore = compose(
  applyMiddleware(),
  devtools(),
  createStore
);

const store = finalCreateStore(combineReducers(reducers));
const devToolsStore = store.getDevToolsStore();

export default class App {
  render() {
    return (
      <div>
        <Provider store={store}>
          {() => <CounterApp />}
        </Provider>
        <DebugPanel>
          {() => <ReduxMonitor store={devToolsStore} />}
        </DebugPanel>
      </div>
    );
  }
}
