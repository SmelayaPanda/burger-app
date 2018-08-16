import * as actionTypes from '../actionTypes'
import axios from '../../../axios-orders'

export const addIngredient = payload => ({
  type: actionTypes.ADD_INGREDIENT, igName: payload
})

export const removeIngredient = payload => ({
  type: actionTypes.REMOVE_INGREDIENT, igName: payload
})

const setIngredients = payload => ({
  type: actionTypes.SET_INGREDIENTS, ingredients: payload
})

const fetchIngredientFail = () => ({
  type: actionTypes.FETCH_INGREDIENTS_FAILED
})

export const initIngredients = () => {
  return dispatch => {
    axios.get('/ingredients.json')
      .then(res => {
        dispatch(setIngredients(res.data))
      })
      .catch(() => {
        dispatch(fetchIngredientFail)
      })
  }
}