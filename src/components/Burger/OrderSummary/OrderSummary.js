import React, {Component, Fragment} from 'react';
import Button from '../../UI/Button/Button'

class OrderSummary extends Component {

  render() {
    const ingredientSummary = Object.keys(this.props.ingredients)
      .map(igKey => {
        return (
          <li key={igKey}>
            <span style={{textTransform: 'capitalize'}}>{igKey}</span>: {this.props.ingredients[igKey]}
          </li>
        )
      })
    return (
      <Fragment>
        <h3>Your order</h3>
        <p>A delicious burger with with the following ingredients:</p>
        <ul>{ingredientSummary}</ul>
        <p><strong>Total price: {this.props.totalPrice.toFixed(2)}</strong></p>
        <p>Continue to checkout?</p>
        <Button btnType={'Danger'} clicked={this.props.purchaseCancelled}>CANCEL</Button>
        <Button btnType={'Success'} clicked={this.props.purchaseContinue}>CONTINUE</Button>
      </Fragment>
    )
  }
}


export default OrderSummary;