import { delay } from "redux-saga/effects";
import { put } from "redux-saga/effects";

// import * as actionTypes from "../actions/actionTypes"; // no longer needed
import * as actions from "../actions/index";

//* turns function into a generator
// yield makes the execution synchronous
export function* logoutSaga(action) {
  yield localStorage.removeItem("token");
  yield localStorage.removeItem("expirationDate");
  yield localStorage.removeItem("userId");
  yield put(actions.logoutSucceed());
}

export function* checkAuthTimeoutSaga(action) {
  yield delay(action.expirationTime);
  yield put(actions.logout());
}
