import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { reducer } from './reducers/reducer';
import { composeWithDevTools } from 'redux-devtools-extension'
import "bootstrap/dist/css/bootstrap.min.css"
import {injectStoreToServer} from "./actions/server";
import { rootSaga } from './sagas/rootSaga';
import {createEpicMiddleware} from "redux-observable";
import {fetchDataEpic, rootEpic} from "./components/Epics/rootEpic";
import createSagaMiddleware from "redux-saga";

// const epicMiddleWare = createEpicMiddleware()
const sagaMiddleWare = createSagaMiddleware()

const store = createStore(reducer,
    composeWithDevTools(applyMiddleware(sagaMiddleWare)))

sagaMiddleWare.run(rootSaga)
injectStoreToServer(store)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);