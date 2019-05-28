import React from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import ReactDOM from "react-dom";
import { DevCloud } from "@datenbanker/devcloud-client-lib";
import Theme from "../components/Theme";
import Layouter from "../components/Layouter";
import { links, routes } from "./config/routes";

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
        pool: ["3b955ad1-db47-4d70-94a3-d0623f907cee"]
      }
    }
  },
  handler: {
    tokenChange: tokens => {}
  },
  groups: {
    "31a7c3a8-021e-4769-9ac3-b021ccc9f3e7": "admin"
  }
});

Theme.init({
  palette: {
    thirdly: "#000"
  }
});

const Store = createStore((state = [], action) => {
  console.log(action.type);
  return state;
});

ReactDOM.render(
  <Provider store={Store}>
    <Layouter
      layout={{
        name: "admin-extended",
        props: {
          logo: <p>Test logo</p>,
          sideBar: <p>Test sideBar</p>,
          reduxEvents: {
            signOut: "SIGN_OUT"
          }
        }
      }}
      links={links}
      routes={routes}
    />
  </Provider>,
  document.getElementById("root")
);
