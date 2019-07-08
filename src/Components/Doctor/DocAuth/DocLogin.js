import React, { Component } from 'react';
import axios from 'axios';
import { updateDoctor } from '../../../redux/doctorReducer';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class DocLogin extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
		};
	}

	handleChange = e => {
		this.setState({
			[e.target.name]: e.target.value,
		});
	};

	handleDoctorLogin = e => {
		e.preventDefault();
		const { email, password } = this.state;
		axios
			.post('/auth/doctorlogin', { email, password })
			.then(res => {
				this.props.updateDoctor(res.data);
				this.props.history.push('/doctordashboard');
			})
			.catch(err => {
				console.log(err);
			});
	};

	render() {
		return (
			<>
			<div class='ripple-background'>
					<div class='circle xxlarge shade1' />
					<div class='circle xlarge shade2' />
					<div class='circle large shade3' />
					<div class='circle mediun shade4' />
					<div class='circle small shade5' />
				</div>
			
				<form className='login_fields' onSubmit={this.handleDoctorLogin}>
					<input
						type='email'
						name='email'
						placeholder='email'
						onChange={this.handleChange}
					/>
					<input
						type='password'
						name='password'
						placeholder='password'
						onChange={this.handleChange}
					/>
					<button >Login</button>
				<Link className='register_btn' to='/doctorregister'>
					<button>Register</button>
				</Link>
				</form>
			
			</>
		);
	}
}

function mapStateToProps(reduxState) {
	return reduxState;
}

export default connect(
	mapStateToProps,
	{ updateDoctor },
)(DocLogin);
