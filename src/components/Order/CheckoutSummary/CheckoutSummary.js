import React from 'react';
import Burger from '../../Burger/Burger'
import Button from '../../UI/Button/Button'
import classes from './CheckoutSummary.css'
import PropTypes from 'prop-types'

const checkoutSummary = (props) => {
  return (
    <div className={classes.CheckoutSummary}>
      <h1>We hope it tastes well!</h1>
      <div style={{width: '100%', height: '300px', margin: 'auto'}}>
        <Burger ingredients={props.ingredients}/>
      </div>
      <Button btnType={'Danger'} clicked={''}>CANCEL</Button>
      <Button btnType={'Success'} clicked={''}>CONTINUE</Button>
    </div>
  );
};

checkoutSummary.propTypes = {
  ingredients: PropTypes.object.isRequired
}

export default checkoutSummary;