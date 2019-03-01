import React from "react";
import Aux from "../../../hoc/Auxiliar/Auxiliar";
import Button from "../../UI/Button/Button";

const translate = {
  salad: "Salada",
  bacon: "Bacon",
  cheese: "Queijo",
  meat: "Carne"
};

// class OrderSummary extends Component {
const orderSummary = props => {
  // this could be a functional component, doesn't need to be a class

  // componentWillUpdate() {
  //     console.log('[OrderSummary] componentWillUpdate')
  // }

  // render() {
  const ingredientSummary = Object.keys(props.ingredients).map(igKey => {
    return (
      <li key={igKey}>
        <span style={{ textTransform: "capitalize" }}>{translate[igKey]}</span>:{" "}
        {props.ingredients[igKey]}
      </li>
    );
  });

  return (
    <Aux>
      <h3>Seu pedido</h3>
      <p>Um delicioso hamburguer com:</p>
      <ul>{ingredientSummary}</ul>
      <p>
        <strong>Total: {props.price.toFixed(2)}</strong>
      </p>
      <p>Finalizar pedido?</p>
      <Button btnType="Danger" clicked={props.purchaseCancelled}>
        Cancelar
      </Button>
      <Button btnType="Success" clicked={props.purchaseContinued}>
        Continuar
      </Button>
    </Aux>
  );
  // }
};

export default orderSummary;
