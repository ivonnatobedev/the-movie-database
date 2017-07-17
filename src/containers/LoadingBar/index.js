import React, { Component } from "react";
import { ProgressBar, Collapse } from "react-bootstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class LoadingBar extends Component {
  render() {
    const { isLoading } = this.props;
    return(
      <Collapse in={isLoading}>
        <ProgressBar
          active
          now={100}
        />
      </Collapse>
    );
  }
}

LoadingBar.propTypes = {
  isLoading: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => {
  return {
    isLoading: state.loading.isLoading
  };
};

export default connect(mapStateToProps, null)(LoadingBar);