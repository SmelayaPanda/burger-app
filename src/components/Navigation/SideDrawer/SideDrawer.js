import React from 'react';
import Logo from '../../Logo/Logo'
import NavigationItems from '../../Navigation/NavigationItems/NavigationsItems'
import classes from './SideDrawer.css'

const sideDrawer = (props) => (
  <div className={classes.SideDrawer}>
    <div className={classes.Logo}>
      <Logo/>
    </div>
    <nav>
      <NavigationItems/>
    </nav>
  </div>
)

export default sideDrawer;