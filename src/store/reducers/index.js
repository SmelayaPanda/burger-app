import {combineReducers} from 'redux'
import burgerBuilder from './modules/burgerBuilder'
import order from './modules/order'


export default combineReducers({
  burgerBuilder,
  order
})
