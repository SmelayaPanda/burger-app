import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom'
import {createStore, applyMiddleware, compose} from 'redux'
import {Provider} from 'react-redux'
import  thunk from 'redux-thunk'
import createSagaMiddleware from 'redux-saga'

import reducer from './store/reducers' // index js imported by default
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {watchAuth} from './store/sagas'

const sagaMiddleware = createSagaMiddleware()

let composeEnhancers
composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose : null || compose;
const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(thunk, sagaMiddleware))
)

sagaMiddleware.run(watchAuth)

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </Provider>
);
ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
