import React, { Component } from "react";

import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  withStyles
} from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/pro-light-svg-icons/faSignOutAlt";

import Theme from "../../Theme";
import defaultStyle from "../../../styles/Layouts/AppBarOnly";

class AppBarOnly extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { page, content, classes } = this.props;
    return (
      <div className="admin-layout">
        <AppBar>
          <Toolbar>
            <Typography variant="h6" color="inherit" style={{ flexGrow: 1 }}>
              {page}
            </Typography>
            <IconButton
              onClick={() => {
                this.props.signOut();
              }}
              className={classes.signOutButton}
            >
              <FontAwesomeIcon icon={faSignOutAlt} />
            </IconButton>
          </Toolbar>
        </AppBar>
        <main className={classes.content}>{content}</main>
      </div>
    );
  }
}

export default withStyles(Theme.getStyle("Layout/Admin", defaultStyle))(
  AppBarOnly
);
