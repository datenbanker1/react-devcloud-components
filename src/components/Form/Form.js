import React, { Component } from "react";
import { Grid, Typography, CircularProgress } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import CenterElements from "./../CenterElements";
import Theme from "../Theme";
import defaultStyle from "../../styles/Form";

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pending: this.props.pending || false
    };
    this.togglePending = this.togglePending.bind(this);
  }
  togglePending(set) {
    this.setState({ ...this.state, pending: set || !this.state.pending });
  }
  render() {
    const { label, children, actions, classes } = this.props;
    const { pending } = this.state;
    const formActions = {
      togglePending: this.togglePending
    };
    return (
      <form style={{ position: "relative" }}>
        {pending && (
          <div className={classes.overlay}>
            <CenterElements textAlign="center">
              <CircularProgress size={25} />
            </CenterElements>
          </div>
        )}
        {label && (
          <Typography variant="subheading" gutterBottom>
            <span className="primary">{label}</span>
          </Typography>
        )}
        <Grid container spacing={8}>
          {children}
        </Grid>
        <div style={{ paddingTop: "15px" }}>
          {actions && actions(formActions)}
        </div>
      </form>
    );
  }
}

export default withStyles(Theme.getStyle("Form", defaultStyle))(Form);
