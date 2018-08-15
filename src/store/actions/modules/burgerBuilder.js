import * as actionTypes from '../actionTypes'

export const addIngredient = payload => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    igName: payload
  }
}

export const removeIngredient = payload => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    igName: payload
  }
}