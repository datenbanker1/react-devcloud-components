import { connect } from "react-redux";

const data = store => {
  return {};
};

const actions = dispatch => ({
  dispatch: action => {
    dispatch(action());
  }
});

export default component =>
  connect(
    data,
    actions
  )(component);
