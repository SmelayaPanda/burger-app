import * as actionTypes from '../actionTypes'
import axios from '../../../axios-orders'

const purchaseBurgerSuccess = (payload) => ({
  type: actionTypes.PURCHASE_BURGER_SUCCESS,
  payload: payload
})

const purchaseBurgerFail = (err) => ({
  type: actionTypes.PURCHASE_BURGER_FAIL,
  payload: err
})

export const purchaseBurgerStart = () => ({
  type: actionTypes.PURCHASE_BURGER_START,
})

export const purchaseBurger = (payload) => {
  return dispatch => {
    dispatch(purchaseBurgerStart())
    axios.post('/order.json', payload)
      .then(res => {
        console.log(res.data);
        dispatch(purchaseBurgerSuccess({...payload, id: res.data.key}))
      })
      .catch(err => {
        console.log(err);
        dispatch(purchaseBurgerFail(err))
      })
  }
}