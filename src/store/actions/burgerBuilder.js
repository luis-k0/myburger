import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";

export const addIngredient = name => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingredientName: name
  };
};

export const removeIngredient = name => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    ingredientName: name
  };
};

export const setIngredients = ingredients => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    ingredients: ingredients
  };
};

export const fetchIngredientsFailed = () => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAILED
  };
};

export const initIngredients = () => {
  return dispatch => {
    axios
      .get("/ingredients2.json")
      .then(response => {
        let ingredientsLoaded = {};
        Object.keys(response.data).forEach((_, index) => {
          Object.assign(
            ingredientsLoaded,
            response.data[Object.keys(response.data)[index]]
          );
        });
        // this.setState({ ingredients: ingredientsLoaded });
        dispatch(setIngredients(ingredientsLoaded));
      })
      .catch(error => {
        // this.setState({ error: true });
        dispatch(fetchIngredientsFailed());
      });
  };
};
