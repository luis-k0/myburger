import React from 'react'
import Aux from '../../../hoc/Auxiliar'

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
            <p>Um delicioso hamburguer com os ingredientes:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p>Finalizar pedido?</p>
        </Aux>
    )
}

export default orderSummary