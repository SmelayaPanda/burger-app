import React from 'react';
import burgerLogo from '../../assets/images/burger-logo.png'
import classes from './Logo.css'

const logo = (props) => {
  console.log(props.height);
  return (
    <div className={classes.Logo} style={{height: props.height}}>
      <img src={burgerLogo} alt="Burger"/>
    </div>
  )
}

export default logo;