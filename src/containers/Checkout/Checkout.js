import React, {Component} from 'react';
import {connect} from 'react-redux'
import {Route} from 'react-router-dom'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import ContactData from './ContactData/ContactData'

class Checkout extends Component {
  checkoutCanceledHandler = () => {
    this.props.history.goBack()
  }
  checkoutContinuedHandler = () => {
    this.props.history.replace('/checkout/contact-data')
  }

  render() {
    return (
      <div>
        <CheckoutSummary
          checkoutCanceled={this.checkoutCanceledHandler}
          checkoutContinued={this.checkoutContinuedHandler}
          ingredients={this.props.ingredients}>
        </CheckoutSummary>
        <Route
          path={this.props.match.path + '/contact-data'}
          component={ContactData}/>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ingredients: state.ingredients,
  totalPrice: state.totalPrice
})

export default connect(mapStateToProps)(Checkout);