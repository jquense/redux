import React from 'react';
import CounterApp from './CounterApp';
import { createStore, applyMiddleware, compose, combineReducers, bindActionCreators } from 'redux';
import { Provider, Connector } from 'redux/react';
import * as reducers from '../reducers';

import devTools from '../redux-devtools/index';
import DebugPanel from '../redux-devtools/DebugPanel';
import ReduxMonitor from '../redux-devtools/ReduxMonitor';

const finalCreateStore = compose(
  applyMiddleware(),
  devTools(),
  createStore
);

const store = finalCreateStore(combineReducers(reducers));

export default class App {
  render() {
    return (
      <div>
        <Provider store={store}>
          {() => <CounterApp />}
        </Provider>

        <DebugPanel top right bottom>
          <ReduxMonitor store={store} />
        </DebugPanel>
      </div>
    );
  }
}
