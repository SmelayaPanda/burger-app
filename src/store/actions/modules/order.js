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

export const purchaseInit = () => ({
  type: actionTypes.PURCHASE_INIT
})

export const purchaseBurger = (payload) => (dispatch, getState) => {
  dispatch(purchaseBurgerStart())
  axios.post('/orders.json?auth=' + getState().auth.token, payload)
    .then(res => {
      dispatch(purchaseBurgerSuccess({...payload, id: res.data.name}))
    })
    .catch(err => {
      dispatch(purchaseBurgerFail(err))
    })
}


const fetchOrderSuccess = payload => ({
  type: actionTypes.FETCH_ORDERS_SUCCESS,
  payload: payload
})

const fetchOrderFail = error => ({
  type: actionTypes.FETCH_ORDERS_FAIL,
  payload: error
})

const fetchOrderStart = () => ({
  type: actionTypes.FETCH_ORDERS_START
})


export const fetchOrders = () => (dispatch, getState) => {
  dispatch(fetchOrderStart())
  const queryParams = `?auth=${getState().auth.token}&orderBy="userId"&equalTo="${getState().auth.userId}"`
  axios.get('/orders.json' + queryParams)
    .then(res => {
      const fetchedOrders = []
      for (let key in res.data) {
        fetchedOrders.push({...res.data[key], id: key})
      }
      dispatch(fetchOrderSuccess(fetchedOrders))
    })
    .catch(err => {
      dispatch(fetchOrderFail(err))
    })
}

