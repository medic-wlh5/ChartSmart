import React, { Component } from "react";
import axios from "axios";
import { clearDoctor } from "../../../redux/doctorReducer";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';

class DocLogin extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: ""
    };
  }

  handleChange = (e) => {
      this.setState({
        [e.target.name]: e.target.value
      });
    };

  onSubmit = e => {
    e.preventDefault();
    const { email, password } = this.state;
    axios
      .post("/auth/doctorlogin", { email, password })
      .then(res => {
        this.props.history.push("/doctordashboard");
      })
      .catch(err => {
        console.log(err);
      });
    // e.target.email.value = "";
    // e.target.password.value = "";
  };



  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <input type="email" name="email" placeholder="email" onChange={this.handleChange}/>
          <input type="password" name="password" placeholder="password" onChange={this.handleChange}/>
          <button>Login</button>
        </form>
        <Link to="/doctorregister"><button>Register</button></Link>
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
)(DocLogin);
