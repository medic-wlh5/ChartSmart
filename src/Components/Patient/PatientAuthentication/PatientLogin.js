import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateUser } from '../../../redux/patientReducer';
import { Link } from 'react-router-dom';
import '../PatForm.css'

class PatientLogin extends Component {
	constructor() {
		super();
		this.state = {
			email: '',
			password: '',
		};
	}

	handlePatientLogin = e => {
		e.preventDefault();
		const { email, password } = this.state;
		axios
			.post('/auth/patientlogin', { email, password })
			.then(res => {
				this.props.updateUser(res.data);
				this.props.history.push('/patientdashboard');
			})
			.catch(err => {
				console.log(err);
			});
		this.setState({ email: '', password: '' });
	};

	handleLoginInfoUpdate = e => {
		this.setState({
			[e.target.name]: e.target.value,
		});
	};

	render() {
		return (
			<><div class='ripple-background'>
			<div class='circle xxlarge shade1'></div>
			<div class='circle xlarge shade2'></div>
			<div class='circle large shade3'></div>
			<div class='circle mediun shade4'></div>
			<div class='circle small shade5'></div>
		  </div>
				<form className='login_fields'>
					<input
						type='text'
						name='email'
						placeholder='email'
						onChange={this.handleLoginInfoUpdate}
					/>
					<input
						type='password'
						name='password'
						placeholder='password'
						onChange={this.handleLoginInfoUpdate}
					/>
					<button onClick={this.handlePatientLogin}>Login</button>

					<Link className='register_btn' to='/patientregister'>
						<button>Need an Account?</button>
					</Link>
				</form>
			</>
		);
	}
}

const mapStateToProps = state => state;

export default withRouter(
	connect(
		mapStateToProps,
		{ updateUser },
	)(PatientLogin),
);
