import React, {Component} from 'react';
import PropTypes from 'prop-types'
import axios from '../../../axios-orders'
import Button from '../../../components/UI/Button/Button'
import classes from './ContactData.css'
import Spinner from '../../../components/UI/Spinner/Spinner'

class ContactData extends Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postCode: ''
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
        this.setState({loading: false});
        this.props.history.push('/')
        console.log(response);
      })
      .catch(err => {
        this.setState({loading: false});
        console.log(err)
      })
  }

  render() {
    let form = <form action="">
      <input type="text" name={'name'} placeholder={'Your name'} />
      <input type="email" name={'email'} placeholder={'Your email'} />
      <input type="text" name={'street'} placeholder={'Street'} />
      <input type="text" name={'postalCode'} placeholder={'Postal Code'} />
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

ContactData.propTypes = {
  ingredients: PropTypes.object.isRequired,
  price: PropTypes.number.isRequired
}

export default ContactData;