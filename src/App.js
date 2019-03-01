import React, { useEffect, Suspense } from "react"; // Component removed, didn't necessary with hooks
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
// import Checkout from "./containers/Checkout/Checkout"; // substituído pelo lazy loading abaixo
// import Orders from "./containers/Orders/Orders"; // substituído pelo lazy loading abaixo
// import Auth from "./containers/Auth/Auth"; // substituído pelo lazy loading abaixo
import Logout from "./containers/Auth/Logout/Logout";
import * as actions from "./store/actions/index";
//import asyncComponent from "./hoc/asyncComponent/asyncComponent";

// lazy loading Checkout container
// const asyncCheckout = asyncComponent(() => { // changed to use React.lazy
const Checkout = React.lazy(() => {
  return import("./containers/Checkout/Checkout");
});

// lazy loading Orders container
const Orders = React.lazy(() => {
  return import("./containers/Orders/Orders");
});

// lazy loading Auth container
const Auth = React.lazy(() => {
  return import("./containers/Auth/Auth");
});

// class App extends Component {
const app = props => {
  // don't works with functional component
  // componentDidMount() {
  //   this.props.onTryAutoSignup();
  // }
  // changed to useEffect
  // [] as second argument means that the function only runs when the component did mounted
  useEffect(() => {
    props.onTryAutoSignup();
  }, []);

  // render() {
  // adjusting the routes to authentication
  let routes = (
    <Switch>
      {/* <Route path="/auth" component={Auth} /> */}
      {/* <Route path="/auth" component={asyncAuth} /> changed to use React.lazy */}
      <Route path="/auth" render={props => <Auth {...props} />} />
      <Route path="/" exact component={BurgerBuilder} />
      <Redirect to="/" />
    </Switch>
  );

  // if (this.props.isAuthenticated) {
  if (props.isAuthenticated) {
    routes = (
      <Switch>
        {/* <Route path="/checkout" component={Checkout} /> */}
        {/* <Route path="/checkout" component={asyncCheckout} /> changed to use React.lazy */}
        <Route path="/checkout" render={props => <Checkout {...props} />} />
        {/* <Route path="/orders" component={Orders} /> */}
        {/* <Route path="/orders" component={asyncOrders} /> changed to use React.lazy */}
        <Route path="/orders" render={props => <Orders {...props} />} />
        <Route path="/logout" component={Logout} />
        {/* <Route path="/auth" component={Auth} /> */}
        {/* <Route path="/auth" component={asyncAuth} /> changed to use React.lazy */}
        <Route path="/auth" render={props => <Auth {...props} />} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    );
  }

  return (
    <div>
      <Layout>
        <Suspense fallback={<p>Carregando...</p>}>{routes}</Suspense>
      </Layout>
    </div>
  );
  // }
};

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
  )(app)
);
