import * as actionTypes from '../../actions/actionTypes'

const initState = {
  orders: [],
  loading: false
}

export default function orderReducer(state = initState, action) {
  switch (action.type) {
  case actionTypes.PURCHASE_BURGER_START:
    return {...state, loading: true}
  case actionTypes.PURCHASE_BURGER_SUCCESS:
    return {
      ...state,
      loading: false,
      orders: state.orders.concat(action.payload)
    }
  case actionTypes.PURCHASE_BURGER_FAIL:
    return {
      ...state,
      loading: false
    }
  default:
    return state
  }
}
