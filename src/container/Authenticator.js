import React, { Component } from "react";
import { Authentication, DevCloud } from "@datenbanker/devcloud-client-lib";
import Storage from "@datenbanker/storage";
const storage = new Storage();

const data = props => {
  return {};
};

const actions = props => {
  return {
    autoLogin: () => {
      if (storage.get("user:refreshToken")) {
        const tokens = {
          accessToken: storage.get("user:accessToken"),
          idToken: storage.get("user:idToken"),
          refreshToken: storage.get("user:refreshToken")
        };
        DevCloud.setTokens(tokens);
        if (props.onAuthenticated) props.onAuthenticated();
      }
    },
    login: async (username, password) => {
      const auth = new Authentication();
      const resp = await auth.login(username, password);
      if (resp.accessToken && resp.idToken && resp.refreshToken) {
        if (props.onAuthenticated) props.onAuthenticated();
        return true;
      } else {
        return resp;
      }
    },
    challenge: async (challenges, session) => {
      const auth = new Authentication();
      const resp = await auth.challenge(challenges, session);
      if (props.onAuthenticated) props.onAuthenticated();
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
  class AuthenticatorContainer extends Component {
    render() {
      const { props } = this;
      return React.createElement(component, {
        ...actions(props),
        ...data(props)
      });
    }
  };
