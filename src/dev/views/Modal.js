import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Modals from "../../components/Modal";
import { Button as Btn } from "../../components/Buttons";
import { Form, Text } from "../../components/Form";
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
          <Form>
            <Text
              xs={12}
              sm={6}
              label="Text"
              instant
              value={""}
              readOnly={false}
              onChange={value => {}}
              error={""}
              variant={"fullField"}
              menu={
                <ul>
                  <li>Test 1</li>
                  <li>Test 2</li>
                  <li>Test 3</li>
                </ul>
              }
            />
          </Form>
        </Modals>
      </div>
    );
  }
}

export default withStyles(overrideStyle)(AppBarWrapper);
