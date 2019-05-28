import React, { Component } from "react";

class LazyLoad extends Component {
  _isMounted = false;
  state = {
    pending: true,
    error: false,
    component: false
  };
  async componentDidMount() {
    this._isMounted = true;
    try {
      this.setState({
        ...this.state,
        component: await this.props.component(),
        pending: false
      });
    } catch (err) {
      this.setState({ ...this.state, error: true, pending: false });
    }
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  render() {
    const { pending, error, component } = this.state;
    const { js, componentProps = {} } = this.props;

    if (error) return this.props.error;
    if (pending) return this.props.placeholder;
    if (js) return React.createElement(component.default, componentProps);
    return component;
  }
}

export default LazyLoad;
