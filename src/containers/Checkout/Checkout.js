import React, {Component} from 'react';
import {Route} from 'react-router-dom'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import ContactData from './ContactData/ContactData'

class Checkout extends Component {
  state = {
    ingredients: null,
    totalPrice: 0
  }

  checkoutCanceledHandler = () => {
    this.props.history.goBack()
  }
  checkoutContinuedHandler = () => {
    this.props.history.replace('/checkout/contact-data')
  }

  componentWillMount() {
    const search = new URLSearchParams(this.props.location.search)
    let ingredients = {}
    let price = 0
    for (let param of search.entries()) {
      if (param[0] === 'price') {
        price = param[1]
      } else {
        ingredients[param[0]] = +param[1]
      }
    }
    this.setState({ingredients: ingredients, totalPrice: price});
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
        <Route
          path={this.props.match.path + '/contact-data'}
          render={(props) => (
            <ContactData
              {...props} // withRouter alternative
              ingredients={this.state.ingredients}
              price={+this.state.totalPrice}/>
          )}/>
      </div>
    );
  }
}

export default Checkout;