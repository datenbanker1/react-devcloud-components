import React, { Component } from "react";
import { Grid } from "@material-ui/core";
import Browser from "../../components/Browser";
import Button from "../../components/Buttons/Button";

class BrowserWrapper extends Component {
  state = {
    currentPage: 0,
    recordsPerPage: 4
  };
  componentWillMount() {
    this.props.setActions(<Button>Test</Button>);
  }
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
            currentPage={this.state.currentPage}
            onCurrentPageChange={currentPage =>
              this.setState({ ...this.state, currentPage })
            }
            recordsPerPage={this.state.recordsPerPage}
            onRecordsPerPageChange={recordsPerPage =>
              this.setState({ ...this.state, recordsPerPage })
            }
            recordsPerPageOptions={[1, 2, 3, 4, 5, 10, 20, 50]}
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
            wrapper={elements => (
              <div>
                Das ist ein wrapper
                <div style={{ padding: "25px" }}>{elements}</div>
              </div>
            )}
          />
        </Grid>
      </Grid>
    );
  }
}

export default BrowserWrapper;
