import React, { Component } from "react";
import { connect } from "react-redux";

import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.css";
import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import * as actions from "../../../store/actions/index";

class ContactData extends Component {
  state = {
    orderForm: {
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Sua Rua"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      zip: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Seu CEP"
        },
        value: "",
        validation: {
          required: true,
          minLength: 5,
          maxLength: 8
        },
        valid: false,
        touched: false
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Seu País"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Seu Email"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Seu Nome"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "fastest", displayValue: "Fastest" },
            { value: "cheapest", displayValue: "Cheapest" }
          ]
        },
        value: "fastest",
        validation: {}, //para evitar erro no checkvalidity
        valid: true
      }
    },
    formIsValid: false
    // loading: false // foi para o redux
  };

  orderHandler = event => {
    event.preventDefault(); // evitar o submit para não recarregar a página
    //console.log(this.props.ingredients);
    // this.setState({ loading: true }); // retirada com a inclusão do redux

    // pegando o nome do elemento e o value para enviar ao firebase
    const formData = {};
    for (let formElementIdentifier in this.state.orderForm) {
      formData[formElementIdentifier] = this.state.orderForm[
        formElementIdentifier
      ].value;
    }

    const order = {
      // ingredients: this.props.ingredients,
      ingredients: this.props.ings,
      price: this.props.price,
      orderData: formData
    };

    this.props.onOrderBurger(order); // chamando o action do redux

    // post transferido para o action do redux
    // axios
    //   .post("/orders.json", order)
    //   .then(response => {
    //     this.setState({ loading: false });
    //     this.props.history.push("/");
    //   })
    //   .catch(error => {
    //     this.setState({ loading: false });
    //   });
  };

  checkValidity(value, rules) {
    let isValid = true;

    // caso não tenha validação, caso do select, retorna valido/true
    if (!rules) {
      return true;
    }

    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }
    return isValid;
  }

  inputChangedHandler = (event, inputIdentifier) => {
    // console.log(event.target.value);
    // criando um clone do orderForm com spread(...), pois com = cria uma referência ao objeto
    // sendo igual a alterar o state diretamente
    const updatedOrderForm = {
      ...this.state.orderForm
    };
    // cria um clone do elemento a ser alterado (email, name...)
    // pois o spread/clone só clona 1 nível, o spread acima clonou email, name, address...
    // o spread abaixo clona o 1 nível dos dados do elemento a ser alterado
    const updateFormElement = {
      ...updatedOrderForm[inputIdentifier]
    };
    updateFormElement.value = event.target.value; // alterando o value no elemento clonado
    updateFormElement.valid = this.checkValidity(
      updateFormElement.value,
      updateFormElement.validation
    );
    updateFormElement.touched = true;
    updatedOrderForm[inputIdentifier] = updateFormElement; // alterado o elemento no clone o orderForm do state
    // console.log(updateFormElement);

    // verificando se todos os campos são válidos
    let formIsValid = true;
    for (let inputIdentifier in updatedOrderForm) {
      formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
    }

    this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid });
  };

  render() {
    // transformando objeto em array
    const formElementsArray = [];
    for (let key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key]
      });
    }

    let form = (
      <form onSubmit={this.orderHandler}>
        {/* criando inputs a partir do array */}
        {formElementsArray.map(formElement => (
          <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
            changed={event => this.inputChangedHandler(event, formElement.id)}
          />
        ))}
        {/* <Input
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
        /> */}
        <Button btnType="Success" disabled={!this.state.formIsValid}>
          CONFIRMAR
        </Button>
      </form>
    );
    // if (this.state.loading) { // quando o state era local
    // com o state do redux
    if (this.props.loading) {
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

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.order.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onOrderBurger: orderData => dispatch(actions.purchaseBurger(orderData))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(ContactData, axios));
