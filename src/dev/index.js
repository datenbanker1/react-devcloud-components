import React from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import ReactDOM from "react-dom";
import { DevCloud } from "@datenbanker/devcloud-client-lib";
import Theme from "../components/Theme";
import Router from "../components/Router";
import routes from "./config/routes";

DevCloud.init({
  apiToken:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJkZmRkYjk3Yi1iNDg3LTQyMWUtYmI5OC0zN2NjODJiNzBjOWEiLCJzY29wZXMiOlsiZDJmNGY0NzEtOGNhZi00NjAxLThhYzgtOGJkYWE3MmI4YWI2Il19.wJxP7zP1ByVQok8iNKlqRsMZZUvZr4uCKeoCDr984hE",
  services: {
    authentication: {
      user: {
        pool: ["5502787c-879e-4bb5-b9fa-7fc59920ad91"]
      }
    },
    customer: {
      person: {
        pool: ["188b39f6-e9a0-4814-9312-adff54aa820f"]
      },
      opportunity: {
        pool: ["a5452ff8-189d-4b9d-96b2-525179f921a9"]
      },
      task: {
        pool: ["a5452ff8-189d-4b9d-96b2-525179f921a9"]
      }
    }
  },
  handler: {
    tokenChange: tokens => {}
  }
});

Theme.init();

const Store = createStore((state = [], action) => {
  console.log(action.type);
  switch (action.type) {
    case "AUTHENTICATOR::SIGN_IN":
      window.location = "/forms";
      break;
  }
  return state;
});

ReactDOM.render(
  <Provider store={Store}>
    <Router
      groups={["public"]}
      pages={routes}
      on={{}}
      layouter={{
        on: {
          contentLoaded: "LAYOUTER::CONTENT_LOADED",
          signOut: "LAYOUTER::SIGN_OUT"
        }
      }}
    />
  </Provider>,
  document.getElementById("root")
);
