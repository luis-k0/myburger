import React, { useEffect } from "react";
import { connect } from "react-redux";

import Order from "../../components/Order/Order";
import axios from "../../axios-orders";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actions from "../../store/actions/index";
import Spinner from "../../components/UI/Spinner/Spinner";

// class Orders extends Component {
const orders = props => {
  // state = { // comentado pq passou para o state global
  //   orders: [],
  //   loading: true
  // };

  // componentDidMount() {
  //   this.props.onFetchOrders(this.props.token, this.props.userId);
  //   // passou para o action
  //   // axios
  //   //   .get("/orders.json")
  //   //   .then(res => {
  //   //     console.log(res.data);
  //   //     const fetchedOrders = [];
  //   //     for (let key in res.data) {
  //   //       fetchedOrders.push({
  //   //         ...res.data[key], // spread dos dados da order
  //   //         id: key // incluindo o id do firebase
  //   //       });
  //   //     }
  //   //     this.setState({ loading: false, orders: fetchedOrders });
  //   //   })
  //   //   .catch(err => {
  //   //     this.setState({ loading: false });
  //   //   });
  // }
  useEffect(() => {
    props.onFetchOrders(props.token, props.userId);
  }, []);

  // render() {
  let orders = <Spinner />;
  if (!props.loading) {
    orders = props.orders.map(order => (
      <Order
        key={order.id}
        ingredients={order.ingredients}
        price={+order.price}
      />
    ));
  }
  return <div>{orders}</div>;
  // }
};

const mapStateToProps = state => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchOrders: (token, userId) =>
      dispatch(actions.fetchOrders(token, userId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(orders, axios));
