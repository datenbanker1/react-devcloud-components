import React, { Component } from "react";
import { Grid } from "@material-ui/core";
import Authenticator from "../../components/Authenticator";

class AuthWrapper extends Component {
  render() {
    return (
      <Grid
        style={{ marginTop: "25px" }}
        container
        spacing={8}
        justify="center"
        alignItems="center"
      >
        <Grid item xs={12} md={5}>
          <Authenticator
            onAuthenticated={() => {
              window.location = "/forms";
            }}
          />
        </Grid>
      </Grid>
    );
  }
}

export default AuthWrapper;
