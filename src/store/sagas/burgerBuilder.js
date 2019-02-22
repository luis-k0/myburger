import { put } from "redux-saga/effects";

import axios from "../../axios-orders";
import * as actions from "../actions"; // get index.js by default

export function* initIngredientsSaga(action) {
  try {
    const response = yield axios.get("/ingredients2.json"); // axios.get("/ingredients2.json")
    // .then(response => {
    let ingredientsLoaded = {};
    yield Object.keys(response.data).forEach((_, index) => {
      Object.assign(
        ingredientsLoaded,
        response.data[Object.keys(response.data)[index]]
      );
    });
    yield put(actions.setIngredients(ingredientsLoaded)); //   dispatch(setIngredients(ingredientsLoaded));
    // })
  } catch (error) {
    // .catch(error => {
    yield put(actions.fetchIngredientsFailed()); // dispatch(fetchIngredientsFailed());
    // });
  }
}
