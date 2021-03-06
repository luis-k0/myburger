import { delay } from "redux-saga/effects";
import { put, call } from "redux-saga/effects";
import axios from "axios";

// import * as actionTypes from "../actions/actionTypes"; // no longer needed
import * as actions from "../actions/index";

//* turns function into a generator
// yield makes the execution synchronous
export function* logoutSaga(action) {
  yield call([localStorage, "removeItem"], "token"); // yield localStorage.removeItem("token");
  yield call([localStorage, "removeItem"], "expirationDate"); // yield localStorage.removeItem("expirationDate");
  yield call([localStorage, "removeItem"], "userId"); // yield localStorage.removeItem("userId");
  yield put(actions.logoutSucceed());
}

export function* checkAuthTimeoutSaga(action) {
  yield delay(action.expirationTime * 1000);
  yield put(actions.logout());
}

export function* authUserSaga(action) {
  yield put(actions.authStart()); // dispatch(authStart());
  const authData = {
    email: action.email,
    password: action.password,
    returnSecureToken: true
  };
  let url =
    "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyANJI04LTl1r0_WCWdD6zsLJxaSV9MDYeI";
  if (!action.isSignup) {
    url =
      "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyANJI04LTl1r0_WCWdD6zsLJxaSV9MDYeI";
  }
  try {
    const response = yield axios.post(url, authData); //axios.post(url, authData)
    // .then(response => {
    const expirationDate = yield new Date(
      new Date().getTime() + response.data.expiresIn * 1000
    );
    yield localStorage.setItem("token", response.data.idToken); // storing token in localstorage (<> sessionstorage)
    yield localStorage.setItem("expirationDate", expirationDate);
    yield localStorage.setItem("userId", response.data.localId);
    yield put(
      actions.authSuccess(response.data.idToken, response.data.localId)
    ); //dispatch(authSuccess(response.data.idToken, response.data.localId));
    yield put(actions.checkAuthTimeout(response.data.expiresIn));
    // })
  } catch (error) {
    // .catch(err => {
    yield put(actions.authFail(error.response.data.error)); //dispatch(authFail(err.response.data.error));
    // });
  }
}

export function* authCheckStateSaga(action) {
  const token = yield localStorage.getItem("token"); // const token = localStorage.getItem("token");
  if (!token) {
    yield put(actions.logout()); // dispatch(logout());
  } else {
    const expirationDate = yield new Date(
      localStorage.getItem("expirationDate")
    ); // const expirationDate = new Date(localStorage.getItem("expirationDate"));
    if (expirationDate > new Date()) {
      const localId = yield localStorage.getItem("localId"); // const localId = localStorage.getItem("localId");
      yield put(actions.authSuccess(token, localId)); // dispatch(authSuccess(token, localId));
      yield put(
        // dispatch(
        actions.checkAuthTimeout(
          // checkAuthTimeout(
          (expirationDate.getTime() - new Date().getTime()) / 1000 // calculating in seconds
        )
      );
    } else {
      yield put(actions.logout()); // dispatch(logout());
    }
  }
}
