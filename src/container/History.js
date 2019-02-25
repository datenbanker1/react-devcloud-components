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
    dispatch: checkDispatch,
    loadElements: async (on, id, type, cleanUp, setError) => {
      const customer = new Customer();
      try {
        let result = {};
        switch (type) {
          case "person":
            result = await customer.person.history(id);
            break;
          default:
            console.log("History type not defined");
        }
        checkDispatch(on, "historyElementsLoaded", result);
        cleanUp(result.events, result.start, result.next);
      } catch (err) {
        setError(err);
      }
    }
  };
};
export default component =>
  connect(
    data,
    actions
  )(component);
