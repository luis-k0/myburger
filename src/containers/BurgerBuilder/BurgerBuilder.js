import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import Aux from "../../hoc/Auxiliar/Auxiliar";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
// import * as actionTypes from "../../store/actions/actionTypes"; // substituído por abaixo
import * as actions from "../../store/actions/index"; // index pode ser omitido

// movido para o reducer
// const INGREDIENT_PRICES = {
//   salad: 0.5,
//   cheese: 0.4,
//   meat: 1.3,
//   bacon: 0.7
// };

//export para poder importar no teste
// export class BurgerBuilder extends Component {
const burgerBuilder = props => {
  // constructor (props) {
  //     super(props);
  //     this.state = {...}
  // }
  // state = {
  //   // ingredients: null,
  //   // totalPrice: 4,
  //   // purchasable: false, // comentado com a entrada dos actions
  //   purchasing: false
  //   // loading: false, // comentado com a entrada dos actions
  //   // error: false // comentado com a entrada dos actions
  // };
  const [purchasing, setPurchasing] = useState(false);

  // const componentDidMount() {
  //   // console.log(this.props);
  //   props.onInitIngredients(); // carregando ingredientes no redux
  //   // axios
  //   //   .get("/ingredients2.json")
  //   //   .then(response => {
  //   //     let ingredientsLoaded = {};
  //   //     // for (let index = 0; index < Object.keys(response.data).length; index++) {
  //   //     //     Object.assign(ingredientsLoaded, response.data[Object.keys(response.data)[index]]);
  //   //     // }
  //   //     // console.log(Object.keys(response.data));
  //   //     Object.keys(response.data).forEach((_, index) => {
  //   //       Object.assign(
  //   //         ingredientsLoaded,
  //   //         response.data[Object.keys(response.data)[index]]
  //   //       );
  //   //     });
  //   //     //console.log(ingredientsLoaded);
  //   //     //this.setState({ ingredients: response.data });
  //   //     this.setState({ ingredients: ingredientsLoaded });
  //   //   })
  //   //   .catch(error => {
  //   //     this.setState({ error: true });
  //   //   });
  // }
  useEffect(() => {
    props.onInitIngredients(); // carregando ingredientes no redux
  }, []);

  const purchaseHandler = () => {
    if (props.isAuthenticated) {
      // this.setState({ purchasing: true });
      setPurchasing(true);
    } else {
      props.onSetAuthRedirectPath("/checkout");
      props.history.push("/auth");
    }
  };

  const purchaseCancelHandler = () => {
    // this.setState({ purchasing: false });
    setPurchasing(false);
  };

  const purchaseContinueHandler = () => {
    // retirado devido ao redux, querystring não é mais necessário, informação está no state do redux - início
    // const queryParams = [];
    // // separando os ingredientes do objeto do state em um array no formato da querystring
    // for (let i in this.state.ingredients) {
    //   queryParams.push(
    //     encodeURIComponent(i) +
    //       "=" +
    //       encodeURIComponent(this.state.ingredients[i])
    //   );
    // }
    // // incluindo o preço na querystring
    // // queryParams.push("price=" + this.state.totalPrice); // substituido pelo state do redux
    // queryParams.push("price=" + this.props.price);
    // // juntando os ingredientes do array e montando a querystring para passar para o checkout
    // const queryString = queryParams.join("&");
    // this.props.history.push({
    //   pathname: "/checkout",
    //   search: "?" + queryString
    // });
    // retirado devido ao redux, querystring não é mais necessário - fim

    props.onInitPurchase();
    props.history.push("/checkout");
  };

  const updatePurchaseState = ingredients => {
    // const ingredients = {...this.state.ingredients}
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    // this.setState({ purchasable: sum > 0 }); // alterado com a entrada do redux
    return sum > 0;
  };

  // comentado com a entrada do redux e reducer
  // addIngredientHandler = type => {
  //   //atualizando ingredients
  //   const oldCount = this.state.ingredients[type];
  //   const updatedCount = oldCount + 1;
  //   const updatedIngredients = { ...this.state.ingredients };
  //   updatedIngredients[type] = updatedCount;
  //   //atualizando preço
  //   const priceAddiction = INGREDIENT_PRICES[type];
  //   const oldPrice = this.state.totalPrice;
  //   const newPrice = oldPrice + priceAddiction;
  //   //atualizando state
  //   this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
  //   //habilitando botão finalizar
  //   this.updatePurchaseState(updatedIngredients);
  // };

  // comentado com a entrada do redux e reducer
  // removeIngredientHandler = type => {
  //   const oldCount = this.state.ingredients[type];
  //   if (oldCount <= 0) {
  //     return;
  //   }
  //   const updatedCount = oldCount - 1;
  //   const updatedIngredients = { ...this.state.ingredients };
  //   updatedIngredients[type] = updatedCount;
  //   //atualizando preço
  //   const priceDeduction = INGREDIENT_PRICES[type];
  //   const oldPrice = this.state.totalPrice;
  //   const newPrice = oldPrice - priceDeduction;
  //   //atualizando state
  //   this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
  //   //habilitando botão finalizar
  //   this.updatePurchaseState(updatedIngredients);
  // };

  // render() {
  const disabledInfo = {
    // ...this.state.ingredients  // comentado para o uso do state do redux abaixo
    ...props.ings
  };
  for (let key in disabledInfo) {
    disabledInfo[key] = disabledInfo[key] <= 0;
  }

  let orderSummary = null;

  // checking if ingredients was loaded
  let burger = props.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;
  // if (this.state.ingredients) {  // comentado para o uso do state do redux abaixo
  if (props.ings) {
    burger = (
      <Aux>
        {/* <Burger ingredients={this.state.ingredients} /> substituído pelo state do redux */}
        <Burger ingredients={props.ings} />
        <BuildControls
          // ingredientAdded={this.addIngredientHandler}  // substituido pelo dispatch
          ingredientAdded={props.onIngredientAdded}
          // ingredientRemoved={this.removeIngredientHandler} // substituido pelo dispatch
          ingredientRemoved={props.onIngredientRemoved}
          disabled={disabledInfo}
          // purchasable={this.state.purchasable} // alterado com a entrada do redux
          purchasable={updatePurchaseState(props.ings)}
          ordered={purchaseHandler}
          // price={this.state.totalPrice} // substituido pelo state do redux
          price={props.price}
          isAuth={props.isAuthenticated}
        />
      </Aux>
    );
    orderSummary = (
      <OrderSummary
        // ingredients={this.state.ingredients}  // substituido pelo state do redux
        ingredients={props.ings}
        purchaseCancelled={purchaseCancelHandler}
        purchaseContinued={purchaseContinueHandler}
        // price={this.state.totalPrice}
        price={props.price}
      />
    );
  }
  // comentado com a entrada dos actions
  // if (this.state.loading) {
  //   orderSummary = <Spinner />;
  // }

  return (
    <React.Fragment>
      <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
        {orderSummary}
      </Modal>
      {burger}
    </React.Fragment>
  );
  // }
};

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients, // burgerBuilder é o nome do reducer combinado que está no index.js
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: ingName =>
      // dispatch({ type: actionTypes.ADD_INGREDIENT, ingredientName: ingName }), // substituído pelo action abaxo
      dispatch(actions.addIngredient(ingName)),
    onIngredientRemoved: ingName =>
      // dispatch({ type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName }) // substitído pelo action abaixo
      dispatch(actions.removeIngredient(ingName)),
    onInitIngredients: () => dispatch(actions.initIngredients()),
    onInitPurchase: () => dispatch(actions.purchaseInit()),
    onSetAuthRedirectPath: path => dispatch(actions.setAuthRedirectPath(path))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(burgerBuilder, axios));
