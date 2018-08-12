import React, {Component} from 'react';
import {Route} from 'react-router-dom'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import ContactData from './ContactData/ContactData'

class Checkout extends Component {
  state = {
    ingredients: {}
  }

  checkoutCanceledHandler = () => {
    this.props.history.goBack()
  }
  checkoutContinuedHandler = () => {
    this.props.history.replace('/checkout/contact-data')
  }

  componentDidMount() {
    const search = new URLSearchParams(this.props.location.search)
    let ingredients = {}
    for (let param of search.entries()) {
      ingredients[param[0]] = +param[1]
    }
    this.setState({ingredients: ingredients});
  }

  render() {
    console.log(this.props)
    return (
      <div>
        <CheckoutSummary
          checkoutCanceled={this.checkoutCanceledHandler}
          checkoutContinued={this.checkoutContinuedHandler}
          ingredients={this.state.ingredients}>
        </CheckoutSummary>
        <Route path={this.props.match.path + '/contact-data'} component={ContactData}/>
      </div>
    );
  }
}

export default Checkout;