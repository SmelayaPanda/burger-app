import React, {Component} from 'react';
import {connect} from 'react-redux'
import {fetchOrders} from '../../store/actions'
import axios from '../../axios-orders'
import Order from '../../components/Order/Order'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import Spinner from '../../components/UI/Spinner/Spinner'

class Orders extends Component {
  componentDidMount() {
    this.props.onOrdersFetch()
  }

  render() {
    let orders = <Spinner/>
    if (!this.props.loading) {
      orders =
        <div>
          {this.props.orders.map(order => {
            return <Order key={order.id} ingredients={order.ingredients} price={+order.price}/>
          })}
        </div>;
    }
    return orders
  }
}

const mapStateToProps = state => ({
  orders: state.order.orders,
  loading: state.order.loading
})

const mapDispatchToProps = dispatch => ({
  onOrdersFetch: () => dispatch(fetchOrders())
})

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios))