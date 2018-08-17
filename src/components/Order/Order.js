import React from 'react';
import PropTypes from 'prop-types'
import classes from './Order.css'

const order = (props) => {
  const ingredients = []
  for (let i in props.ingredients) {
    ingredients.push({name: i, amount: props.ingredients[i]})
  }

  let ingredientOutput = ingredients.map(el => {
    return (
      <span
        style={{
          textTransform: 'capitalize',
          display: 'inline-block',
          margin: '0 8px',
          border: '1px solid #eee',
          padding: '5px'
        }}
        key={el.name}>{el.name} <strong>({el.amount})</strong>
      </span>
    )
  })
  return (
    <div className={classes.Order}>
      <p>Ingredients: {ingredientOutput}</p>
      <p>Price: <strong>USD: {props.price.toFixed(2)}</strong></p>
    </div>
  );
};

order.propTypes = {
  price: PropTypes.number.isRequired,
  ingredients: PropTypes.object
}

export default order;