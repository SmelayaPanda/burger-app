import React from 'react'
import PropTypes from 'prop-types'
import {withRouter} from 'react-router-dom'
import classes from './Burger.css'
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";

const burger = props => {
  let transformedIngredients = Object.keys(props.ingredients)
    .map(igKey => {
      return [...Array(props.ingredients[igKey])] // create an empty array with length equal to ingredients counts
        .map((_, i) => {
          return <BurgerIngredient key={igKey + i} type={igKey}/>
        })
    })
    .reduce((prev, cur) => { // flat array
      return prev.concat(cur)
    }, []) // empty array - initial value

  if (transformedIngredients.length === 0) {
    transformedIngredients = <p>Please start adding ingredients!</p>
  }

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type={'bread-top'}/>
      {transformedIngredients}
      <BurgerIngredient type={'bread-bottom'}/>
    </div>
  )
}

burger.propTypes = {
  ingredients: PropTypes.object.isRequired
}
export default withRouter(burger)