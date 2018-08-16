import React from 'react';
import PropTypes from 'prop-types'
import classes from './NavigationItems.css'
import NavigationItem from './NavigationItem/NavigationItem'

const navigationItems = (props) => {
  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem link={'/'} exact>
        Burger Builder
      </NavigationItem>
      <NavigationItem link={'/orders'}>
        Orders
      </NavigationItem>
      {props.isAuth ?
        <NavigationItem link={'/logout'}>Logout</NavigationItem> :
        <NavigationItem link={'/auth'}>Authenticate</NavigationItem>
      }
    </ul>
  );
};

navigationItems.propTypes = {
  isAuth: PropTypes.bool.isRequired
}

export default navigationItems;