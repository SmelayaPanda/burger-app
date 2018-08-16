import React, {Component, Fragment} from 'react'
import {addIngredient, removeIngredient, initIngredients, purchaseInit} from '../../store/actions/index'
import {connect} from 'react-redux'
import axios from '../../axios-orders'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from '../../components/UI/Spinner/Spinner'

class BurgerBuilder extends Component {
  state = { // no needed in global redux management because this state belong to this component UI only
    purchasing: false
  }

  componentDidMount() {
    this.props.onInitIngredients()
  }

  updatePurchaseState = (ingredients) => {
    const sum = Object.values(ingredients).reduce((prev, next) => prev + next)
    return sum > 0
  }

  purchaseHandler = () => {
    if (this.props.isAuth) {
      this.setState({purchasing: true});
    } else {
      this.props.history.push('/auth')
    }
  }

  purchaseCancelHandler = () => {
    this.setState({purchasing: false});
  }

  purchaseContinueHandler = () => {
    this.props.onInitPurchase()
    this.props.history.push('/checkout')
  }

  render() {
    const disabledInfo = {...this.props.ingredients}
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0
    }
    let orderSummary = null
    let burger = this.props.error ? <p>Ingredients can't be loaded...</p> : <Spinner/>
    if (this.props.ingredients) {
      burger = (
        <Fragment>
          <Burger ingredients={this.props.ingredients}/>
          <BuildControls
            price={this.props.totalPrice}
            disabled={disabledInfo}
            isAuth={this.props.isAuth}
            ordered={this.purchaseHandler}
            purchasable={this.updatePurchaseState(this.props.ingredients)}
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemoved}/>
          {/* Argument igName will be passed bellow in BuildControls */}
        </Fragment>
      );
      orderSummary = <OrderSummary
        totalPrice={this.props.totalPrice}
        purchaseCancelled={this.purchaseCancelHandler}
        purchaseContinue={this.purchaseContinueHandler}
        ingredients={this.props.ingredients}/>;
    }

    return (
      <Fragment>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({
  ingredients: state.burgerBuilder.ingredients,
  totalPrice: state.burgerBuilder.totalPrice,
  error: state.burgerBuilder.error,
  isAuth: state.auth.token !== null
})

const mapDispatchToProps = dispatch => ({
  onIngredientAdded: (igName) => dispatch(addIngredient(igName)),
  onIngredientRemoved: (igName) => dispatch(removeIngredient((igName))),
  onInitIngredients: () => dispatch(initIngredients()),
  onInitPurchase: () => dispatch(purchaseInit())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios))
// You can use axios for catch error event if you don't use it here (it excite error from redux)