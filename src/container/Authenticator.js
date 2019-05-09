import { connect } from "react-redux";
import { Authentication, DevCloud } from "@datenbanker/devcloud-client-lib";
import Storage from "@datenbanker/storage";
const storage = new Storage();

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
    autoLogin: on => {
      if (!!storage.get("user:refreshToken")) {
        const tokens = {
          accessToken: storage.get("user:accessToken"),
          idToken: storage.get("user:idToken"),
          refreshToken: storage.get("user:refreshToken")
        };
        console.log(tokens);
        DevCloud.setTokens(tokens);
        checkDispatch(on, "signIn");
        return true;
      }
      return false;
    },
    login: async (username, password, on) => {
      const auth = new Authentication();
      const resp = await auth.login(username, password);
      if (resp.accessToken && resp.idToken && resp.refreshToken) {
        checkDispatch(on, "signIn");
        return true;
      } else {
        return resp;
      }
    },
    challenge: async (challenges, session, on) => {
      const auth = new Authentication();
      const resp = await auth.challenge(challenges, session);
      checkDispatch(on, "signIn");
      return resp;
    },
    resetPassword: async email => {
      const auth = new Authentication();
      return await auth.resetPassword(email);
    },
    resetAccount: async email => {
      const auth = new Authentication();
      return await auth.resetAccount(email);
    }
  };
};
export default component =>
  connect(
    data,
    actions
  )(component);
