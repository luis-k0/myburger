import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from '../Checkout/ContactData/ContactData';

class Checkout extends Component {
    state = {
        ingredients: null,
        price: 0
    }

    componentWillMount() {
        // tirando os ingrediente da querystring enviada do burgerbuilder e remotando o objeto com os ingredientes
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        let price = 0;
        for (let param of query.entries()) {
            // parametro price não é um ingrediente e por isso não vai para o ingredients
            if (param[0] === 'price') {
                price = param[1];
            } else {
                ingredients[param[0]] = +param[1];
            }
        }
        this.setState({ ingredients: ingredients, price: price });
    }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {
        return (
            <div>
                <CheckoutSummary
                    ingredients={this.state.ingredients}
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler}
                />
                {/* por causa do render o objeto history não estará disponível no ContactData */}
                {/* o parametro props no render faz com que o props do checkout seja passado para o ContactData */}
                <Route
                    path={this.props.match.path + '/contact-data'}
                    render={
                        (props) =>
                            (
                                <ContactData
                                    ingredients={this.state.ingredients}
                                    price={this.state.price}
                                    {...props}
                                />
                            )
                    }
                />
            </div>
        )
    }
}

export default Checkout;