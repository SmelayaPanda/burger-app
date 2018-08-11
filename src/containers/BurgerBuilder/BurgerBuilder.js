import React, {Component, Fragment} from 'react'
import axios from '../../axios-orders'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
}

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 4,
    purchasable: false,
    purchasing: false
  }

  updatePurchaseState = (ingredients) => {
    const sum = Object.values(ingredients).reduce((prev, next) => prev + next)
    this.setState({purchasable: sum > 0})
  }

  addIngredientHandler = (type) => {
    const updatedIngredients = {...this.state.ingredients}
    updatedIngredients[type] = this.state.ingredients[type] + 1
    const newPrice = this.state.totalPrice + INGREDIENT_PRICES[type]
    this.setState({
      totalPrice: newPrice,
      ingredients: updatedIngredients
    })
    this.updatePurchaseState(updatedIngredients)
  }

  removeIngredientHandler = (type) => {
    if (this.state.ingredients[type] <= 0) return
    const updatedIngredients = {...this.state.ingredients}
    updatedIngredients[type] = this.state.ingredients[type] - 1
    const newPrice = this.state.totalPrice - INGREDIENT_PRICES[type]
    this.setState({
      totalPrice: newPrice,
      ingredients: updatedIngredients
    })
    this.updatePurchaseState(updatedIngredients)
  }

  purchaseHandler = () => {
    this.setState({purchasing: true});
  }

  purchaseCancelHandler = () => {
    this.setState({purchasing: false});
  }

  purchaseContinueHandler = () => {
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: 'Panda',
        address: {
          street: 'Somestreet',
          zipCode: '630090',
          country: 'Russia'
        },
        email: 'panda@mail.ru'
      },
      deliveryMethod: 'fastest',
      date: new Date().getTime()
    }
    // .json it's only firebase endpoint addition
    axios.post('/orders.json', order)
      .then(response => {
        console.log(response);
      })
      .catch(err => {
        console.log(err)
      })
  }

  render() {
    const disabledInfo = {...this.state.ingredients}
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0
    }

    return (
      <Fragment>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
          <OrderSummary
            totalPrice={this.state.totalPrice}
            purchaseCancelled={this.purchaseCancelHandler}
            purchaseContinue={this.purchaseContinueHandler}
            ingredients={this.state.ingredients}/>
        </Modal>
        <Burger ingredients={this.state.ingredients}/>
        <BuildControls
          price={this.state.totalPrice}
          disabled={disabledInfo}
          ordered={this.purchaseHandler}
          purchasable={this.state.purchasable}
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}/>
      </Fragment>
    )
  }
}

export default BurgerBuilder