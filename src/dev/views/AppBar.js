import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import SubAppBar from "../../components/SubAppBar";
import { Fab, DrawerButton } from "../../components/Buttons";
import { faPlus } from "@fortawesome/pro-light-svg-icons";

const overrideStyle = {
  test: {
    top: "-5px",
    right: "-5px"
  }
};

class AppBarWrapper extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div>
        <SubAppBar>
          <Fab variant="success" icon={faPlus} />
          <DrawerButton
            style={{ float: "right" }}
            position="right"
            variant="default"
            label="Filter"
            badge={4}
            override={{ badge: classes.test }}
          >
            Drawer Content
          </DrawerButton>
        </SubAppBar>
      </div>
    );
  }
}

export default withStyles(overrideStyle)(AppBarWrapper);
