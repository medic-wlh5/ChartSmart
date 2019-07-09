import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateUser } from '../../../redux/patientReducer';
import { Link } from 'react-router-dom';
import '../PatForm.css';

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
		console.log(this.state.params);
		return (
			<div className='pat_log'>
				<div class='ripple-background'>
					<div class='circle xxlarge shade1' />
					<div class='circle xlarge shade2' />
					<div class='circle large shade3' />
					<div class='circle mediun shade4' />
					<div class='circle small shade5' />
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
			</div>
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
