import React, {Component} from 'react';
import {connect} from 'react-redux'
import axios from '../../../axios-orders'
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler'
import {purchaseBurger} from '../../../store/actions'
import Button from '../../../components/UI/Button/Button'
import classes from './ContactData.css'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'
import {checkValidity} from '../../../shared/utility'

class ContactData extends Component {
  state = {
    formIsValid: false,
    orderForm: {
      name: {
        type: 'input',
        config: {type: 'text', placeholder: 'Your Name'},
        value: '',
        validation: {required: true},
        valid: false,
        touched: false
      },
      street: {
        type: 'input',
        config: {type: 'text', placeholder: 'Street'},
        value: '',
        validation: {required: true},
        valid: false,
        touched: false
      },
      zipCode: {
        type: 'input',
        config: {type: 'text', placeholder: 'Zip Code'},
        value: '',
        validation: {required: true, minLength: 6, maxLength: 6},
        valid: false,
        touched: false
      },
      country: {
        type: 'input',
        config: {type: 'text', placeholder: 'Country'},
        value: '',
        validation: {required: true},
        valid: false,
        touched: false
      },
      email: {
        type: 'email',
        config: {type: 'text', placeholder: 'Your E-Mail'},
        value: '',
        validation: {required: true},
        valid: false,
        touched: false
      },
      deliveryMethod: {
        type: 'select',
        config: {
          options: [
            {value: 'fastest', displayValue: 'Fastest'},
            {value: 'cheapest', displayValue: 'Cheapest'}
          ]
        },
        value: 'fastest',
        touched: false
      }
    }
  }

  orderHandler = (event) => {
    event.preventDefault() // prevent default behavior - prevent send request - default event of <form/>
    const formData = {}
    for (let key in this.state.orderForm) {
      formData[key] = this.state.orderForm[key].value
    }
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.totalPrice,
      orderData: formData,
      userId: this.props.userId,
      date: new Date().getTime()
    }

    this.props.onOrderBurger(order)
  }

  inputChangedHandler = (event, inputIdentifier) => {
    const updatedOrderForm = {...this.state.orderForm}
    const updatedFormEl = {...updatedOrderForm[inputIdentifier]}
    updatedFormEl.value = event.target.value
    updatedFormEl.touched = true
    updatedFormEl.valid = checkValidity(updatedFormEl.value, updatedFormEl.validation)
    updatedOrderForm[inputIdentifier] = updatedFormEl

    let formIsValid = true
    for (let key in updatedOrderForm) {
      if (typeof updatedOrderForm[key].valid !== 'undefined') {
        formIsValid = updatedOrderForm[key].valid && formIsValid
      }
    }

    this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});
  }

  render() {
    let formElemetArray = []
    for (let key in this.state.orderForm) {
      formElemetArray.push({
        id: key,
        data: this.state.orderForm[key]
      })
    }

    let form =
      <form onSubmit={this.orderHandler}>
        {formElemetArray.map(el => (
          <Input
            key={el.id}
            value={el.data.value}
            changed={(event) => this.inputChangedHandler(event, el.id)}
            shouldValidate={el.data.validation}
            invalid={!el.data.valid}
            touched={el.data.touched}
            config={el.data.config}
            type={el.data.type}/>
        ))}
        <Button btnType={'Success'} disabled={!this.state.formIsValid}>ORDER</Button>
      </form>;

    if (this.props.loading) {
      form = <Spinner/>
    }

    return (
      <div className={classes.ContactData}>
        <h4>Enter Your contact data</h4>
        {form}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ingredients: state.burgerBuilder.ingredients,
  totalPrice: state.burgerBuilder.totalPrice,
  loading: state.order.loading,
  userId: state.auth.userId
})

const mapDispatchToProps = dispatch => ({
  onOrderBurger: (payload) => dispatch(purchaseBurger(payload))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(ContactData, axios));