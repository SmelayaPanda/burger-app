import React, {Component} from 'react';
import {Route, Switch, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {authCheckState} from './store/actions'
import Layout from './hoc/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout'
import Auth from './containers/Auth/Auth'
import Logout from './containers/Auth/Logout/Logout'
import Orders from './containers/Orders/Orders'

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignin()
  }

  render() {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path={'/checkout'} component={Checkout}/>
            <Route path={'/orders'} component={Orders}/>
            <Route path={'/logout'} component={Logout}/>
            <Route path={'/auth'} component={Auth}/>
            <Route path={'/'} component={BurgerBuilder}/>
          </Switch>
        </Layout>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  onTryAutoSignin: () => dispatch(authCheckState())
})

export default withRouter(connect(null, mapDispatchToProps)(App));
