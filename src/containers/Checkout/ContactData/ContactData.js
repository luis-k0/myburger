import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        console.log(this.props.ingredients);

        this.setState({ loading: true });
        const order = {
            ingredients: this.props.ingredients,
            price: this.state.price,
            customer: {
                name: 'Luis K',
                address: {
                    street: 'Teste Street',
                    zip: '93944',
                    country: 'Brazil'
                },
                email: 'luisk@teste.com'
            },
            deliveryMethod: 'fastest'
        }
        axios.post('/orders.json', order)
            .then(response => {
                this.setState({ loading: false });
                this.props.history.push('/');
            })
            .catch(error => {
                this.setState({ loading: false });
            });
    }

    render() {
        let form = (
            <form>
                <input className={classes.Input} type="email" name="email" placeholder="Seu Email" />
                <input className={classes.Input} type="text" name="name" placeholder="Seu Nome" />
                <input className={classes.Input} type="text" name="street" placeholder="Sua Rua" />
                <input className={classes.Input} type="text" name="postal" placeholder="Seu CEP" />
                <Button btnType="Success" clicked={this.orderHandler}>CONFIRMAR</Button>
            </form>);
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