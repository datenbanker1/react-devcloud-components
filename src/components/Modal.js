import React from "react";
import PropTypes from "prop-types";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  withMobileDialog
} from "@material-ui/core";

class ResponsiveDialog extends React.Component {
  state = {
    open: false
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const {
      fullScreen,
      open,
      onClose,
      title,
      children,
      actions,
      maxWidth
    } = this.props;

    return (
      <div>
        <Dialog
          fullScreen={fullScreen}
          open={open}
          onClose={onClose}
          maxWidth={maxWidth}
          fullWidth={Boolean(maxWidth)}
          style={{ zIndex: "100" }}
        >
          <DialogTitle>{title}</DialogTitle>
          <DialogContent>{children}</DialogContent>
          {Boolean(actions) && (
            <DialogActions style={{ margin: "0px", padding: "0px 24px 8px" }}>
              {actions}
            </DialogActions>
          )}
        </Dialog>
      </div>
    );
  }
}

ResponsiveDialog.propTypes = {
  fullScreen: PropTypes.bool.isRequired
};

export default withMobileDialog()(ResponsiveDialog);
