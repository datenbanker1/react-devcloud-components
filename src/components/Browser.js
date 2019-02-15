import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Theme from "./Theme";
import Pagination from "./Pagination";
import Sorting from "./Sorting";
import defaultStyle from "../styles/Browser";

class Browser extends Component {
  state = {
    recordsPerPage: this.props.recordsPerPage || 5,
    currentPage: 0,
    currentSorting: {
      active: null,
      order: null
    }
  };
  getFilteredAndSortedItems = elements => {
    const { filter, sort } = this.props;
    const { currentSorting } = this.state;
    return elements
      .filter(filter)
      .sort((a, b) => sort.function(a, b, currentSorting));
  };
  getElementsForPage = elements => {
    const currentPage =
      this.props.currentPage || this.props.currentPage === 0
        ? this.props.currentPage
        : this.state.currentPage;
    const recordsPerPage =
      this.props.recordsPerPage || this.state.recordsPerPage;
    const { element } = this.props;
    return elements
      .slice(
        currentPage * recordsPerPage,
        currentPage * recordsPerPage + recordsPerPage
      )
      .map(element);
  };
  getPages = records => {
    const { recordsPerPage } = this.state;
    return Math.ceil(records.length / recordsPerPage);
  };
  setCurrentPage = page => {
    const currentPageProp = this.props.currentPage;
    if (currentPageProp || currentPageProp === 0)
      this.props.onCurrentPageChange(page - 1);
    else this.setState({ ...this.state, currentPage: page - 1 });
  };
  setRecordsPerPage = recordsPerPage => {
    const recordsPerPageeProp = this.props.recordsPerPage;
    if (recordsPerPageeProp) this.props.onRecordsPerPageChange(recordsPerPage);
    else this.setState({ ...this.state, recordsPerPage });
  };
  setSorting = currentSorting => {
    this.setState({ ...this.state, currentSorting });
  };
  render() {
    const {
      props,
      getPages,
      getFilteredAndSortedItems,
      setCurrentPage,
      getElementsForPage,
      setRecordsPerPage,
      setSorting
    } = this;
    const { classes, items, sort, recordsPerPageOptions } = props;
    const currentPage =
      this.props.currentPage || this.props.currentPage === 0
        ? this.props.currentPage
        : this.state.currentPage;
    const recordsPerPage =
      this.props.recordsPerPage || this.state.recordsPerPage;
    const preparedItems = getFilteredAndSortedItems(items);
    const pages = getPages(preparedItems);

    return (
      <div>
        {sort && !!sort.options.length && (
          <div className={classes.sortHolder}>
            <Sorting options={sort.options} onChange={setSorting} />
          </div>
        )}
        <div className={classes.elementsHolder}>
          {getElementsForPage(preparedItems)}
        </div>
        <div className={classes.paginationHolder}>
          <Pagination
            current={currentPage + 1}
            from={1}
            to={pages}
            onChange={setCurrentPage}
            recordsPerPage={recordsPerPage}
            recordsPerPageOptions={
              recordsPerPageOptions || [5, 10, 20, 50, 100]
            }
            onChangeRecordsPerPage={setRecordsPerPage}
          />
        </div>
      </div>
    );
  }
}

export default withStyles(Theme.getStyle("Browser", defaultStyle))(Browser);
