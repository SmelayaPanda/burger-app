import {combineReducers} from 'redux'
import burgerBuilder from './modules/burgerBuilder'
import order from './modules/order'
import auth from './modules/auth'


export default combineReducers({
  burgerBuilder,
  order,
  auth
})
