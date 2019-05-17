import { connect } from "react-redux";
import { Customer } from "@datenbanker/devcloud-client-lib";

const data = store => {
  return {};
};

const actions = dispatch => {
  const checkDispatch = (on, type, payload = {}) => {
    if (on && on[type])
      dispatch({
        type: on[type],
        payload
      });
  };
  return {
    startTimer: on => {
      checkDispatch(on, "startTimer");
    },
    stopTimer: async (start, end, pauses, onSuccess, onError, on) => {
      const customer = new Customer();
      try {
        const result = await customer.task.timeClock.add(start, end, pauses);
        onSuccess(result);
        checkDispatch(on, "stopTimer");
      } catch (err) {
        onError(err);
      }
    },
    startPause: on => {
      checkDispatch(on, "startPause");
    },
    stopPause: on => {
      checkDispatch(on, "stopPause");
    }
  };
};

export default component =>
  connect(
    data,
    actions
  )(component);
