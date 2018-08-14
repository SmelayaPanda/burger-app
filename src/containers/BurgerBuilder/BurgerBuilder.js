import React, {Component, Fragment} from 'react'
import * as actionTypes from '../../store/actions'
import {connect} from 'react-redux'
import axios from '../../axios-orders'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from '../../components/UI/Spinner/Spinner'

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
}

class BurgerBuilder extends Component {
  state = {
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: null
  }

  componentDidMount() {
    // axios.get('https://burger-app-e23f8.firebaseio.com/ingredients.json')
    //   .then(res => {
    //     this.setState({ingredients: res.data});
    //   })
    //   .catch(err => {
    //     this.setState({error: true});
    //   })
  }


  updatePurchaseState = (ingredients) => {
    const sum = Object.values(ingredients).reduce((prev, next) => prev + next)
    this.setState({purchasable: sum > 0})
  }

  // addIngredientHandler = (type) => {
  //   const updatedIngredients = {...this.props.ingredients}
  //   updatedIngredients[type] = this.props.ingredients[type] + 1
  //   const newPrice = this.state.totalPrice + INGREDIENT_PRICES[type]
  //   this.setState({
  //     totalPrice: newPrice,
  //     ingredients: updatedIngredients
  //   })
  //   this.updatePurchaseState(updatedIngredients)
  // }
  //
  // removeIngredientHandler = (type) => {
  //   if (this.props.ingredients[type] <= 0) return
  //   const updatedIngredients = {...this.props.ingredients}
  //   updatedIngredients[type] = this.props.ingredients[type] - 1
  //   const newPrice = this.state.totalPrice - INGREDIENT_PRICES[type]
  //   this.setState({
  //     totalPrice: newPrice,
  //     ingredients: updatedIngredients
  //   })
  //   this.updatePurchaseState(updatedIngredients)
  // }

  purchaseHandler = () => {
    this.setState({purchasing: true});
  }

  purchaseCancelHandler = () => {
    this.setState({purchasing: false});
  }

  purchaseContinueHandler = () => {
    let queryParams = []
    for (let i in this.props.ingredients) {
      queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.props.ingredients[i]))
    }
    queryParams.push('price=' + this.state.totalPrice)
    this.props.history.push({
      pathname: '/checkout',
      search: '?' + queryParams.join('&')
      // state: {ingredients: this.state.ingredients}
    })
  }

  render() {
    const disabledInfo = {...this.props.ingredients}
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0
    }
    let orderSummary = null
    let burger = this.state.error ? <p>Ingredients can't be loaded...</p> : <Spinner/>
    if (this.props.ingredients) {
      burger = (
        <Fragment>
          <Burger ingredients={this.props.ingredients}/>
          <BuildControls
            price={this.state.totalPrice}
            disabled={disabledInfo}
            ordered={this.purchaseHandler}
            purchasable={this.state.purchasable}
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemoved}/>
          {/* Argument igName will be passed bellow in BuildControls */}
        </Fragment>
      );
      orderSummary = <OrderSummary
        totalPrice={this.state.totalPrice}
        purchaseCancelled={this.purchaseCancelHandler}
        purchaseContinue={this.purchaseContinueHandler}
        ingredients={this.props.ingredients}/>;
    }
    if (this.state.loading) {
      orderSummary = <Spinner/>
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
  ingredients: state.ingredients,
  totalPrice: state.totalPrice
})

const mapDispatchToProps = dispatch => ({
  onIngredientAdded: (igName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: igName}),
  onIngredientRemoved: (igName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: igName})
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios))