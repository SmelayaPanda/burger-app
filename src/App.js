import React, {Component} from 'react';
import {Route, Switch, withRouter, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import Layout from './hoc/Layout/Layout'
import asyncComponent from './hoc/asyncComponent/asyncComponent'
import {authCheckState} from './store/actions'

import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';

const Checkout = asyncComponent(() => import('./containers/Checkout/Checkout'))
const Auth = asyncComponent(() => import('./containers/Auth/Auth'))
const Logout = asyncComponent(() => import('./containers/Auth/Logout/Logout'))
const Orders = asyncComponent(() => import('./containers/Orders/Orders'))

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignin()
  }

  render() {
    let routes = (
      <Switch>
        <Route path={'/auth'} exact component={Auth}/>
        <Route path={'/'} exact component={BurgerBuilder}/>
        <Redirect to={'/'}/>
      </Switch>
    )

    if (this.props.isAuth) {
      routes = (
        <Switch>
          <Route path={'/checkout'} component={Checkout}/>
          <Route path={'/orders'} component={Orders}/>
          <Route path={'/logout'} component={Logout}/>
          <Route path={'/auth'} exact component={Auth}/>
          <Route path={'/'} exact component={BurgerBuilder}/>
          <Redirect to={'/'}/>
        </Switch>
      )
    }

    return (
      <div>
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuth: state.auth.token !== null
})

const mapDispatchToProps = dispatch => ({
  onTryAutoSignin: () => dispatch(authCheckState())
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
