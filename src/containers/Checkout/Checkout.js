import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "../Checkout/ContactData/ContactData";
// import * as actions from "../../store/actions/index";

// class Checkout extends Component {
const checkout = props => {
  // componentWillMount() { // comentado porque é o evento errado para iniciar o purchase
  //   this.props.onInitPurchase();
  // }

  // retirado por que o state está no redux - início
  // state = {
  //     ingredients: null,
  //     price: 0
  // }

  // componentWillMount() {
  //     // tirando os ingrediente da querystring enviada do burgerbuilder e remotando o objeto com os ingredientes
  //     const query = new URLSearchParams(this.props.location.search);
  //     const ingredients = {};
  //     let price = 0;
  //     for (let param of query.entries()) {
  //         // parametro price não é um ingrediente e por isso não vai para o ingredients
  //         if (param[0] === 'price') {
  //             price = param[1];
  //         } else {
  //             ingredients[param[0]] = +param[1];
  //         }
  //     }
  //     this.setState({ ingredients: ingredients, price: price });
  // }
  // retirado por que o state está no redux - fim

  const checkoutCancelledHandler = () => {
    props.history.goBack();
  };

  const checkoutContinuedHandler = () => {
    props.history.replace("/checkout/contact-data");
  };

  // render() {
  let summary = <Redirect to="/" />;
  if (props.ings) {
    const purchaseRedirect = props.purchased ? <Redirect to="/" /> : null;
    summary = (
      <div>
        {purchaseRedirect}
        <CheckoutSummary
          // ingredients={this.state.ingredients}
          ingredients={props.ings}
          checkoutCancelled={checkoutCancelledHandler}
          checkoutContinued={checkoutContinuedHandler}
        />
        {/* por causa do render o objeto history não estará disponível no ContactData */}
        {/* o parametro props no render faz com que o props do checkout seja passado para o ContactData */}
        <Route
          path={props.match.path + "/contact-data"}
          component={ContactData}
          // não é necessário com o redux, ingredients e price estão no state global
          // render={
          //     (props) =>
          //         (
          //             <ContactData
          //                 ingredients={this.state.ingredients}
          //                 price={this.state.price}
          //                 {...props}
          //             />
          //         )
          // }
        />
      </div>
    );
  }
  return summary;
  // }
};

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    purchased: state.order.purchased
  };
};

// const mapDispatchToProps = dispatch => { // purchase não será iniciado aqui
//   return {
//     onInitPurchase: () => dispatch(actions.purchaseInit())
//   };
// };

// mapDispatchToProps não é obrigatório
export default connect(mapStateToProps)(checkout);
