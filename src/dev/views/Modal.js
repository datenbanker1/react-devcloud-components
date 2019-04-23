import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Modals from "../../components/Modal";
import { Button as Btn } from "../../components/Buttons";
import Button from "@material-ui/core/Button";

const overrideStyle = {
  test: {
    top: "-5px",
    right: "-5px"
  }
};

class AppBarWrapper extends Component {
  state = {
    open: false
  };
  toogleModal = to => {
    this.setState({
      ...this.state,
      open: typeof to === "undefined" ? !{ ...this.state }.open : to
    });
  };
  render() {
    const { open } = this.state;
    const action = <Btn variant="default">Schließen</Btn>;
    return (
      <div>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => this.toogleModal(true)}
        >
          Open responsive dialog
        </Button>
        <Modals
          title="Titel"
          open={open}
          maxWidth="md"
          onClose={() => this.toogleModal(false)}
          actions={action}
        >
          <div>Hi</div>
        </Modals>
      </div>
    );
  }
}

export default withStyles(overrideStyle)(AppBarWrapper);
