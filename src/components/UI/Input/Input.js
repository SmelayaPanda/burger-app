import React from 'react';
import PropTypes from 'prop-types'
import classes from './Input.css'

const input = (props) => {
  let inputElement = null
  switch (props.type) {
  case('input'):
    inputElement = <input className={classes.InputElement} value={props.value} {...props.config} />
    break
  case('text-area'):
    inputElement = <textarea className={classes.InputElement} value={props.value} {...props.config}/>
    break
  case ('select'):
    inputElement = (
      <select className={classes.InputElement} value={props.value}>
        {props.config.options.map(el => {
          return (
            <option value={el.value} key={el.value}>
              {el.displayValue}
            </option>
          )
        })}
      </select>
    )
    break
  default:
    inputElement = <input className={classes.InputElement} value={props.value} {...props.config}/>
  }
  return (
    <div className={classes.Input}>
      <label className={classes.Label} htmlFor="">{props.label}</label>
      {inputElement}
    </div>
  );
};

input.propTypes = {
  type: PropTypes.string,
  config: PropTypes.object.isRequired,
  label: PropTypes.string,
  value: PropTypes.arrayOf([
    PropTypes.string,
    PropTypes.number
  ])
}

export default input;