import React from 'react'
import Aux from '../../../hoc/Auxiliar'
import Button from '../../UI/Button/Button'

const orderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients)
        .map(igKey => {
            return (
                <li key={igKey}>
                    <span style={{textTransform: 'capitalize'}}>{igKey}</span>: {props.ingredients[igKey]}
                </li>
            )
        })
    return (
        <Aux>
            <h3>Seu pedido</h3>
            <p>Um delicioso hamburguer com:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total: {props.price.toFixed(2)}</strong></p>
            <p>Finalizar pedido?</p>
            <Button btnType="Danger" clicked={props.purchaseCancelled}>Cancelar</Button>
            <Button btnType="Success" clicked={props.purchaseContinued}>Continuar</Button>
        </Aux>
    )
}

export default orderSummary