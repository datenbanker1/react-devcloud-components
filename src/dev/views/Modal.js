import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Modals from "../../components/Modal";
import { Button as Btn } from "../../components/Buttons";
import { Form, Text, Select } from "../../components/Form";
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
            <Text xs={12} placeholder="TEST" value={""} variant={"fullField"} />
            <Text xs={12} placeholder="TEST" value={""} variant={"fullField"} />
            <Text xs={12} placeholder="TEST" value={""} variant={"fullField"} />
            <Text xs={12} placeholder="TEST" value={""} variant={"fullField"} />
            <Text xs={12} placeholder="TEST" value={""} variant={"fullField"} />
            <Text xs={12} placeholder="TEST" value={""} variant={"fullField"} />
            <Text xs={12} placeholder="TEST" value={""} variant={"fullField"} />
            <Text
              xs={6}
              placeholder="Autocomplete"
              value={""}
              onChange={value => {}}
              id="my-test-id"
              menu={
                <ul>
                  <li>Item 1</li>
                  <li>Item 2</li>
                  <li>Item 3</li>
                  <li>Item 3</li>
                  <li>Item 3</li>
                  <li>Item 3</li>
                  <li>Item 3</li>
                  <li>Item 3</li>
                  <li>Item 3</li>
                  <li>Item 3</li>
                  <li>Item 3</li>
                  <li>Item 3</li>
                  <li>Item 3</li>
                </ul>
              }
              variant={"fullField"}
            />
            <Select
              xs={6}
              options={[
                "option 1",
                "option 2",
                "option 3",
                "option 4",
                "option 5",
                "option 6"
              ]}
              value={""}
              onChange={value => {}}
              variant={"fullField"}
            />
          </Form>
        </Modals>
      </div>
    );
  }
}

export default withStyles(overrideStyle)(AppBarWrapper);
