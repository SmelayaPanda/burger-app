import React, {Fragment, Component} from 'react';
import Modal from "../../components/UI/Modal/Modal";

// Setup global error handler
const withErrorHandler = (WrapperComponent, axios) => {
  return class extends Component {

    state = {
      error: null
    }

    componentWillMount() {
      this.reqInterceptor = axios.interceptors.request.use(req => {
        this.setState({error: null});
        return req
      })
      // You need always return req/res in interceptors to avoid block of HTTP
      this.resInterceptor = axios.interceptors.response.use(res => res, error => {
        this.setState({error: error});
      })
    }

    componentWillUnmount() {
      axios.interceptors.request.eject(this.reqInterceptor) // remove interceptors: to avoid memory leak if we have routing
      axios.interceptors.response.eject(this.resInterceptor)
    }

    errorConfirmHandler = () => {
      this.setState({error: null});
    }

    render() {
      return (
        <Fragment>
          <Modal show={this.state.error} modalClosed={this.errorConfirmHandler}>
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrapperComponent {...this.props}/>
        </Fragment>
      );
    }
  }
}

export default withErrorHandler;