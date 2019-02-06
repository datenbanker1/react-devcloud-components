import React, { Component } from "react";
import SubAppBar from "../../components/SubAppBar";
import { Fab, DrawerButton } from "../../components/Buttons";
import { faPlus } from "@fortawesome/pro-light-svg-icons";

class AppBarWrapper extends Component {
  render() {
    return (
      <div>
        <SubAppBar>
          <Fab variant="success" icon={faPlus} />
          <DrawerButton
            style={{ float: "right" }}
            position="right"
            variant="default"
            label="Filter"
            badge={1}
          >
            Drawer Content
          </DrawerButton>
        </SubAppBar>
      </div>
    );
  }
}

export default AppBarWrapper;
