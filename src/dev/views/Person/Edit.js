import React, { Component } from "react";
import { Grid } from "@material-ui/core";
import Tracker from "../../../components/Tracker";

class PersonFormWrapper extends Component {
  state = {
    currentPage: 0,
    recordsPerPage: 4
  };
  render() {
    const elements = [];
    for (let i = 0; i < 20; i++) {
      elements.push({ name: "Test-" + i, potential: i });
    }
    return (
      <Grid container spacing={8}>
        <Grid item xs={12} md={6} lg={9} />
        <Grid item xs={12} md={6} lg={3}>
          <Tracker
            id="0337ce6c-48f7-4c16-bfe8-e737c295f800"
            type="person"
            history={{
              listElement: element => {
                return <p>HIHIHIH</p>;
              }
            }}
          />
        </Grid>
      </Grid>
    );
  }
}

export default PersonFormWrapper;
