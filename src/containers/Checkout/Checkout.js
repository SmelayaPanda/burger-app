import React, {Component} from 'react';
import {connect} from 'react-redux'
import {Redirect, Route} from 'react-router-dom'
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
    let summary = <Redirect to={'/'}/>
    if (this.props.ingredients) {
      const purchsedRedirect = this.props.purchased ? <Redirect to={'/'}/> : null
      summary =
        <div>
          {purchsedRedirect}
          <CheckoutSummary
            checkoutCanceled={this.checkoutCanceledHandler}
            checkoutContinued={this.checkoutContinuedHandler}
            ingredients={this.props.ingredients}>
          </CheckoutSummary>
          <Route
            path={this.props.match.path + '/contact-data'}
            component={ContactData}/>
        </div>
    }
    return summary
  }
}

const mapStateToProps = state => ({
  ingredients: state.burgerBuilder.ingredients,
  purchased: state.order.purchased
})

export default connect(mapStateToProps)(Checkout)
