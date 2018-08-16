import React, {Component} from 'react';
import {connect} from 'react-redux'
import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import classes from './Auth.css'
import {auth} from '../../store/actions'

class Auth extends Component {
  state = {
    controls: {
      email: {
        type: 'input',
        config: {type: 'email', placeholder: 'E-Mail'},
        value: '',
        validation: {required: true, isEmail: true},
        valid: false,
        touched: false
      },
      password: {
        type: 'input',
        config: {type: 'password', placeholder: 'Password'},
        value: '',
        validation: {required: true, minLength: 6},
        valid: false,
        touched: false
      }
    },
    isSignup: true
  }

  static checkValidity(value, rules) {
    if (!rules) return true
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
    if (rules.isEmail) {
      isValid = /\S+@\S+\.\S+/.test(value.trim()) && isValid
    }
    if (rules.number) {
      isValid = !isNaN(parseFloat(value)) && isFinite(value) && isValid
    }
    return isValid
  }

  inputChangedHandler = (event, elName) => {
    const updatedControls = {
      ...this.state.controls,
      [elName]: {
        ...this.state.controls[elName],
        value: event.target.value,
        valid: Auth.checkValidity(event.target.value, this.state.controls[elName].validation),
        touched: true
      }
    }
    this.setState({controls: updatedControls});
  }

  submitHandler = (event) => {
    event.preventDefault()
    this.props.onAuth(
      this.state.controls.email.value,
      this.state.controls.password.value,
      this.state.isSignup
    )
  }

  switchAuthModeHandler = () => {
    this.setState(prevState => {
      return {isSignup: !prevState.isSignup}
    })
  }

  render() {
    let formElemetArray = []
    for (let key in this.state.controls) {
      formElemetArray.push({id: key, data: this.state.controls[key]})
    }

    const form = formElemetArray.map(el => (
      <Input
        key={el.id}
        value={el.data.value}
        changed={(event) => this.inputChangedHandler(event, el.id)}
        shouldValidate={el.data.validation}
        invalid={!el.data.valid}
        touched={el.data.touched}
        config={el.data.config}
        type={el.data.type}/>
    ))

    return (
      <div className={classes.Auth}>
        <form onSubmit={this.submitHandler}>
          {form}
          <Button btnType={'Success'}>Submit</Button>
        </form>
        <Button btnType={'Danger'} clicked={this.switchAuthModeHandler}>
          Switch to {this.state.isSignup ? 'Signin' : 'Signup'}
        </Button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  // loading: state.auth.
})

const mapDispatchToProps = dispatch => ({
  onAuth: (email, password, isSignup) => dispatch(auth(email, password, isSignup))
})

export default connect(null, mapDispatchToProps)(Auth);