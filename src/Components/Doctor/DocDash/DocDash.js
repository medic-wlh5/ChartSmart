import React, { Component } from "react";
import { clearDoctor } from "../../../redux/doctorReducer";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";

class DocDash extends Component {

  handleLogout = () => {
    this.props.clearDoctor();
    axios.get("/auth/logout").catch(err => {
      console.log(err);
    });
  };

  render() {
    return (
      <div>
        <h1>DocDash</h1>
        <Link to="/">
          <button onClick={this.handleLogout}>Logout</button>
        </Link>
      </div>
    );
  }
}

function mapStateToProps(reduxState) {
  return reduxState;
}

export default connect(
  mapStateToProps,
  { clearDoctor }
)(DocDash);
