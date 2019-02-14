import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "../Checkout/ContactData/ContactData";

class Checkout extends Component {
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

  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  };

  checkoutContinuedHandler = () => {
    this.props.history.replace("/checkout/contact-data");
  };

  render() {
    let summary = <Redirect to="/" />;
    if (this.props.ings) {
      summary = (
        <div>
          <CheckoutSummary
            // ingredients={this.state.ingredients}
            ingredients={this.props.ings}
            checkoutCancelled={this.checkoutCancelledHandler}
            checkoutContinued={this.checkoutContinuedHandler}
          />
          {/* por causa do render o objeto history não estará disponível no ContactData */}
          {/* o parametro props no render faz com que o props do checkout seja passado para o ContactData */}
          <Route
            path={this.props.match.path + "/contact-data"}
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
  }
}

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients
  };
};

// mapDispatchToProps não é obrigatório
export default connect(mapStateToProps)(Checkout);
