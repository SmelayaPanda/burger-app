import React, {Fragment, Component} from 'react';
import Modal from "../../components/UI/Modal/Modal";

// Setup global error handler
const withErrorHandler = (WrapperComponent, axios) => {
  return class extends Component {

    state = {
      error: null
    }

    componentDidMount() {
      axios.interceptors.request.use(req => {
        this.setState({error: null});
        return req
      })
      // You need always return req/res in interceptors to avoid block of HTTP
      axios.interceptors.response.use(res => res, error => {
        this.setState({error: error});
      })
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