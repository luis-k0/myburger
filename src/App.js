import React, { Component } from "react";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
// import Checkout from "./containers/Checkout/Checkout"; // substituído pelo lazy loading abaixo
// import Orders from "./containers/Orders/Orders"; // substituído pelo lazy loading abaixo
// import Auth from "./containers/Auth/Auth"; // substituído pelo lazy loading abaixo
import Logout from "./containers/Auth/Logout/Logout";
import * as actions from "./store/actions/index";
import asyncComponent from "./hoc/asyncComponent/asyncComponent";

// lazy loading Checkout container
const asyncCheckout = asyncComponent(() => {
  return import("./containers/Checkout/Checkout");
});

// lazy loading Orders container
const asyncOrders = asyncComponent(() => {
  return import("./containers/Orders/Orders");
});

// lazy loading Auth container
const asyncAuth = asyncComponent(() => {
  return import("./containers/Auth/Auth");
});

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  render() {
    // adjusting the routes to authentication
    let routes = (
      <Switch>
        {/* <Route path="/auth" component={Auth} /> */}
        <Route path="/auth" component={asyncAuth} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    );
    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          {/* <Route path="/checkout" component={Checkout} /> */}
          <Route path="/checkout" component={asyncCheckout} />
          {/* <Route path="/orders" component={Orders} /> */}
          <Route path="/orders" component={asyncOrders} />
          <Route path="/logout" component={Logout} />
          {/* <Route path="/auth" component={Auth} /> */}
          <Route path="/auth" component={asyncAuth} />
          <Route path="/" exact component={BurgerBuilder} />
          <Redirect to="/" />
        </Switch>
      );
    }

    return (
      <div>
        <Layout>{routes}</Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  };
};

// withRouter because app doesn't works after include connect
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
