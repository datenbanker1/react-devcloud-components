import React, { Component } from "react";
import { Grid } from "@material-ui/core";
import History from "../../components/History";

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
      <div>
        <History
          elements={[
            "ASD",
            { $type: "yearFlag", year: 2019 },
            "HUI",
            { $type: "yearFlag", year: 2018 }
          ]}
          listElement={element => {
            return <p>{element}</p>;
          }}
        />
      </div>
    );
  }
}

export default PersonFormWrapper;
