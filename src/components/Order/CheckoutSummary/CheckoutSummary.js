import React from 'react';
import Burger from '../../Burger/Burger'
import Button from '../../UI/Button/Button'
import classes from './CheckoutSummary.css'
import PropTypes from 'prop-types'

const checkoutSummary = (props) => {
  return (
    <div className={classes.CheckoutSummary}>
      <h1>We hope it tastes well!</h1>
      <div style={{width: '100%', margin: 'auto'}}>
        <Burger ingredients={props.ingredients}/>
      </div>
      <Button btnType={'Danger'} clicked={props.checkoutCanceled}>CANCEL</Button>
      <Button btnType={'Success'} clicked={props.checkoutContinued}>CONTINUE</Button>
    </div>
  );
};

checkoutSummary.propTypes = {
  ingredients: PropTypes.object.isRequired,
  checkoutCanceled: PropTypes.func.isRequired,
  checkoutContinued: PropTypes.func.isRequired,
}

export default checkoutSummary;