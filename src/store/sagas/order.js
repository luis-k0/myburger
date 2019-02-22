import { put } from "redux-saga/effects";

import axios from "../../axios-orders";
import * as actions from "../actions"; // index.js is default

export function* purchaseBurgerSaga(action) {
  yield put(actions.purchaseBurgerStart()); // dispatch(purchaseBurgerStart());
  try {
    const response = yield axios.post(
      "/orders.json?auth=" + action.token,
      action.orderData
    ); // axios.post("/orders.json?auth=" + token, orderData)
    yield put(
      actions.purchaseBurgerSuccess(response.data.name, action.orderData)
    ); // dispatch(purchaseBurgerSuccess(response.data.name, orderData));
  } catch (error) {
    yield put(actions.purchaseBurgerFail(error)); // dispatch(purchaseBurgerFail(error));
  }
}

export function* fetchOrdersSaga(action) {
  yield put(actions.fetchOrdersStart()); // dispatch(fetchOrdersStart());
  const queryParams =
    "?auth=" +
    action.token +
    '&orderBy="userId"&equalTo="' +
    action.userId +
    '"';
  try {
    const response = yield axios.get("/orders.json" + queryParams); // axios.get("/orders.json" + queryParams)
    const fetchedOrders = [];
    for (let key in response.data) {
      fetchedOrders.push({
        ...response.data[key], // spread dos dados da order
        id: key // incluindo o id do firebase
      });
    }
    yield put(actions.fetchOrdersSuccess(fetchedOrders)); // dispatch(fetchOrdersSuccess(fetchedOrders));
  } catch (error) {
    yield put(actions.fetchOrdersFail(error)); // dispatch(fetchOrdersFail(err));
  }
}
