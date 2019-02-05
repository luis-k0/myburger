import React, { Component } from "react";

import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.css";
import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";

class ContactData extends Component {
  state = {
    orderForm: {
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Sua Rua"
        },
        value: ""
      },
      zip: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Seu CEP"
        },
        value: ""
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Seu País"
        },
        value: ""
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Seu Email"
        },
        value: ""
      },
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Seu Nome"
        },
        value: ""
      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "fastest", displayValue: "Fastest" },
            { value: "cheapest", displayValue: "Cheapest" }
          ]
        },
        value: ""
      }
    },
    loading: false
  };

  orderHandler = event => {
    event.preventDefault();
    console.log(this.props.ingredients);

    this.setState({ loading: true });
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price
    };
    axios
      .post("/orders.json", order)
      .then(response => {
        this.setState({ loading: false });
        this.props.history.push("/");
      })
      .catch(error => {
        this.setState({ loading: false });
      });
  };

  render() {
    let form = (
      <form>
        <Input
          inputtype="input"
          type="email"
          name="email"
          placeholder="Seu Email"
        />
        <Input
          inputtype="input"
          type="text"
          name="name"
          placeholder="Seu Nome"
        />
        <Input
          inputtype="input"
          type="text"
          name="street"
          placeholder="Sua Rua"
        />
        <Input
          inputtype="input"
          type="text"
          name="postal"
          placeholder="Seu CEP"
        />
        <Button btnType="Success" clicked={this.orderHandler}>
          CONFIRMAR
        </Button>
      </form>
    );
    if (this.state.loading) {
      form = <Spinner />;
    }
    return (
      <div className={classes.ContactData}>
        <h4>Informe seus dados</h4>
        {form}
      </div>
    );
  }
}

export default ContactData;
