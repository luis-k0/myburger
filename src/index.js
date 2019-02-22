import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose, combineReducers } from "redux"; // applyMiddleware e compose usado com redux-thunk
import thunk from "redux-thunk";
import createSagaMiddleware from "redux-saga";

import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import burgerBuilderReducer from "./store/reducers/burgerBuilder";
import orderReducer from "./store/reducers/order";
import authReducer from "./store/reducers/auth";
// import { logoutSaga } from "./store/sagas/auth"; // is no longer needed
import { watchAuth, watchBurgerBuilder, watchOrder } from "./store/sagas"; //importing index.js which is default

// para que o redux devtools funcione
// process.env.NODE_ENV === 'development' verificar se está em ambiente de desenvolvimento
// variável está em config/env.js
// para só liberar o redux devtools em desenvolvimento
// para que o dev tools não mostre o state em produção
const composeEnhancers =
  process.env.NODE_ENV === "development"
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : null || compose;

const rootReducer = combineReducers({
  burgerBuilder: burgerBuilderReducer,
  order: orderReducer,
  auth: authReducer
});

const sagaMiddleware = createSagaMiddleware();

// second parameter is to include redux devtools to the project
// segundo parâmetro é para incluir o redux devtools no projeto
const store = createStore(
  rootReducer, //burgerBuilderReducer,
  composeEnhancers(applyMiddleware(thunk, sagaMiddleware))
);

// sagaMiddleware.run(logoutSaga); // created just for test
sagaMiddleware.run(watchAuth);
sagaMiddleware.run(watchBurgerBuilder);
sagaMiddleware.run(watchOrder);

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
