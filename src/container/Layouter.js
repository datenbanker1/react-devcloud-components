import { connect } from "react-redux";

const data = store => {
  return {};
};

const actions = dispatch => {
  return {
    dispatch: (on, type, payload = {}) => {
      if (on && on[type])
        dispatch({
          type: on[type],
          payload
        });
    }
  };
};

export default component =>
  connect(
    data,
    actions
  )(component);
