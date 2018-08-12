import React, {Component} from 'react';
import PropTypes from 'prop-types'
import axios from '../../../axios-orders'
import Button from '../../../components/UI/Button/Button'
import classes from './ContactData.css'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        type: 'input',
        config: {type: 'text', placeholder: 'Your Name'},
        value: '',
        validation: {required: true},
        valid: false
      },
      street: {
        type: 'input',
        config: {type: 'text', placeholder: 'Street'},
        value: '',
        validation: {required: true},
        valid: false
      },
      zipCode: {
        type: 'input',
        config: {type: 'text', placeholder: 'Zip Code'},
        value: '',
        validation: {required: true, minLength: 5, maxLength: 5},
        valid: false
      },
      country: {
        type: 'input',
        config: {type: 'text', placeholder: 'Country'},
        value: '',
        validation: {required: true},
        valid: false
      },
      email: {
        type: 'email',
        config: {type: 'text', placeholder: 'Your E-Mail'},
        value: '',
        validation: {required: true},
        valid: false
      },
      deliveryMethod: {
        type: 'select',
        config: {
          options: [
            {value: 'fastest', displayValue: 'Fastest'},
            {value: 'cheapest', displayValue: 'Cheapest'}
          ]
        },
        value: ''
      }
    },
    loading: false
  }

  orderHandler = (event) => {
    event.preventDefault() // prevent default behavior - prevent send request - default event of <form/>
    this.setState({loading: true});
    const formData = {}
    for (let key in this.state.orderForm) {
      formData[key] = this.state.orderForm[key].value
    }
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      orderData: formData,
      date: new Date().getTime()
    }
    // .json it's only firebase endpoint addition
    axios.post('/orders.json', order)
      .then(response => {
        this.setState({loading: false});
        this.props.history.push('/')
        console.log(response);
      })
      .catch(err => {
        this.setState({loading: false});
        console.log(err)
      })
  }

  checkValidity(value, rules) {
    let isValid = true
    if (rules.required) {
      isValid = value.trim() !== '' && isValid
    }
    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid
    }
    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid
    }
    return isValid
  }

  inputChangedHandler = (event, inputIdentifier) => {
    const updatedOrderForm = {...this.state.orderForm}
    const updatedFormElement = {...updatedOrderForm[inputIdentifier]}
    updatedFormElement.value = event.target.value
    updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation)
    // console.log(updatedFormElement)
    updatedOrderForm[inputIdentifier] = updatedFormElement
    this.setState({orderForm: updatedOrderForm});
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
            value={el.value}
            changed={(event) => this.inputChangedHandler(event, el.id)}
            config={el.data.config}
            type={el.data.type}/>
        ))}
        <Button btnType={'Success'}>ORDER</Button>
      </form>;

    if (this.state.loading) {
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

ContactData
  .propTypes = {
    ingredients: PropTypes.object.isRequired,
    price: PropTypes.number.isRequired
  }

export default ContactData;