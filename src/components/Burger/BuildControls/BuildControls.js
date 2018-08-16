import React from 'react'
import PropTypes from 'prop-types'
import classes from './BuildControls.css'
import BuildControl from './BuildControl/BuildControl'

const controls = [
  {label: 'Salad', type: 'salad'},
  {label: 'Bacon', type: 'bacon'},
  {label: 'Cheese', type: 'cheese'},
  {label: 'Meat', type: 'meat'}
]

const buildControls = props => (
  <div className={classes.BuildControls}>
    <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
    {controls.map(el => (
      <BuildControl
        key={el.label}
        label={el.label}
        disabled={props.disabled[el.type]}
        added={() => props.ingredientAdded(el.type)}
        removed={() => props.ingredientRemoved(el.type)}/>)
    )}
    <button
      disabled={!props.purchasable}
      onClick={props.ordered}
      className={classes.OrderButton}>
      {props.isAuth ? 'ORDER NOW' : 'SIGNUP TO ORDER'}
    </button>
  </div>
)

buildControls.propTypes = {
  isAuth: PropTypes.bool.isRequired
}

export default buildControls