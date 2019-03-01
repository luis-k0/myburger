import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import classes from "./Auth.css";
import * as actions from "../../store/actions/index";
import Spinner from "../../components/UI/Spinner/Spinner";
import { updateObject, checkValidity } from "../../shared/utility";

// class Auth extends Component {
const auth = props => {
  const [controls, setControls] = useState({
    email: {
      elementType: "input",
      elementConfig: {
        type: "email",
        placeholder: "Seu Email"
      },
      value: "",
      validation: {
        required: true,
        isEmail: true
      },
      valid: false,
      touched: false
    },
    password: {
      elementType: "input",
      elementConfig: {
        type: "password",
        placeholder: "Sua Senha"
      },
      value: "",
      validation: {
        required: true,
        minLength: 6
      },
      valid: false,
      touched: false
    }
  });
  const [isSignup, setIsSignup] = useState(true);

  useEffect(() => {
    if (!props.buildingBurger && props.authRedirectPath !== "/") {
      props.onSetAuthRedirectPath();
    }
  }, []);

  const inputChangedHandler = (event, controlName) => {
    // REFACTORED to use updateObject
    // const updatedControls = {
    //   ...this.state.controls,
    //   [controlName]: {
    //     ...this.state.controls[controlName],
    //     value: event.target.value,
    //     valid: this.checkValidity(
    //       event.target.value,
    //       this.state.controls[controlName].validation
    //     ),
    //     touched: true
    //   }
    // };

    const updatedControls = updateObject(controls, {
      [controlName]: updateObject(controls[controlName], {
        value: event.target.value,
        valid: checkValidity(
          event.target.value,
          controls[controlName].validation
        ),
        touched: true
      })
    });

    // this.setState({ controls: updatedControls });
    setControls(updatedControls);
  };

  const submitHandler = event => {
    event.preventDefault();
    props.onAuth(controls.email.value, controls.password.value, isSignup);
  };

  const switchAuthModeHandler = () => {
    // this.setState(prevState => {
    //   // console.log(this.state.isSignup);
    //   return { isSignup: !prevState.isSignup };
    // });
    setIsSignup(!isSignup);
  };

  // render() {
  // transformando objeto em array
  const formElementsArray = [];
  for (let key in controls) {
    formElementsArray.push({
      id: key,
      config: controls[key]
    });
  }

  let form = formElementsArray.map(formElement => (
    <Input
      key={formElement.id}
      elementType={formElement.config.elementType}
      elementConfig={formElement.config.elementConfig}
      value={formElement.config.value}
      invalid={!formElement.config.valid}
      shouldValidate={formElement.config.validation}
      touched={formElement.config.touched}
      changed={event => inputChangedHandler(event, formElement.id)}
    />
  ));

  if (props.loading) {
    form = <Spinner />;
  }

  let errorMessage = null;
  if (props.error) {
    errorMessage = <p>{props.error.message}</p>;
  }

  let authRedirect = null;
  if (props.isAuthenticated) {
    authRedirect = <Redirect to={props.authRedirectPath} />;
  }

  return (
    <div className={classes.Auth}>
      {authRedirect}
      {errorMessage}
      <form onSubmit={submitHandler}>
        {form}
        <Button btnType="Success">ENVIAR</Button>
      </form>
      <Button clicked={switchAuthModeHandler} btnType="Danger">
        {isSignup ? "CADASTRAR-SE" : "LOGAR"}
      </Button>
    </div>
  );
  // }
};

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    buildingBurger: state.burgerBuilder.building,
    authRedirectPath: state.auth.authRedirectPath
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignup) =>
      dispatch(actions.auth(email, password, isSignup)),
    onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath("/"))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(auth);
