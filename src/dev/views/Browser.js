import React, { Component } from "react";
import { Grid } from "@material-ui/core";
import Browser from "../../components/Browser";

class BrowserWrapper extends Component {
  render() {
    const elements = [];
    for (let i = 0; i < 20; i++) {
      elements.push({ name: "Test-" + i, potential: i });
    }
    return (
      <Grid container spacing={8}>
        <Grid item xs={12}>
          <Browser
            items={elements}
            element={item => {
              return (
                <div key={item.name}>
                  {item.name}, Potential: {item.potential}
                </div>
              );
            }}
            filter={element => element}
            sort={{
              function: (a, b, selected) => {
                const { active, order } = selected;
                switch (active) {
                  case "Name":
                    if (order === "asc")
                      return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
                    else return a.name < b.name ? 1 : a.name > b.name ? -1 : 0;
                  case "Potential":
                    if (order === "asc")
                      return a.potential < b.potential
                        ? -1
                        : a.potential > b.potential
                        ? 1
                        : 0;
                    else
                      return a.potential < b.potential
                        ? 1
                        : a.potential > b.potential
                        ? -1
                        : 0;
                  default:
                    return 0;
                }
              },
              options: ["Name", "Potential"]
            }}
          />
        </Grid>
      </Grid>
    );
  }
}

export default BrowserWrapper;
