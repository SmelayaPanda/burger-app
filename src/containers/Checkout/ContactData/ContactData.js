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
        value: ''
      },
      street: {
        type: 'input',
        config: {type: 'text', placeholder: 'Street'},
        value: ''
      },
      zipCode: {
        type: 'input',
        config: {type: 'text', placeholder: 'Zip Code'},
        value: ''
      },
      country: {
        type: 'input',
        config: {type: 'text', placeholder: 'Country'},
        value: ''
      },
      email: {
        type: 'email',
        config: {type: 'text', placeholder: 'Your E-Mail'},
        value: ''
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
    event.preventDefault() // prevent default behavior - prevent send request - default event of <form/> buttons
    console.log(this.props.ingredients);

    this.setState({loading: true});
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
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

  inputChangedHandler = (event, inputIdentifier) => {
    const updatedOrderForm = {...this.state.orderForm}
    const updatedFormElement = {...updatedOrderForm[inputIdentifier]}
    updatedFormElement.value = event.target.value
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

    let form = <form action="">
      {formElemetArray.map(el => (
        <Input
          key={el.id}
          value={el.value}
          changed={(event) => this.inputChangedHandler(event, el.id)}
          config={el.data.config}
          type={el.data.type}/>
      ))}
      <Button btnType={'Success'} clicked={this.orderHandler}>ORDER</Button>
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