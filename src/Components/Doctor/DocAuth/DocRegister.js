import React, { Component } from 'react';
import axios from 'axios';
import { updateDoctor } from '../../../redux/doctorReducer';
import { connect } from 'react-redux';

class DocRegister extends Component {
	constructor(props) {
		super(props);
		this.state = {
			id: '',
			first_name: '',
			last_name: '',
			email: '',
			password: '',
			pin: '',
			office: '',
		};
	}

	handleChange = e => {
		this.setState({
			[e.target.name]: e.target.value,
		});
	};

	onSubmit = e => {
		e.preventDefault();
		const { first_name, last_name, email, password, pin, office } = this.state;
		axios
			.post('/auth/doctorregister', {
				first_name,
				last_name,
				email,
				password,
				pin,
				office,
			})
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
			<div>
				<form onSubmit={this.onSubmit}>
					<input
						name='first_name'
						value={this.state.first_name}
						onChange={this.handleChange}
						placeholder='First Name'
					/>
					<input
						name='last_name'
						value={this.state.last_name}
						onChange={this.handleChange}
						placeholder='Last Name'
					/>
					<input
						name='email'
						value={this.state.email}
						onChange={this.handleChange}
						placeholder='Email'
					/>
					<input
						name='password'
						value={this.state.password}
						onChange={this.handleChange}
						placeholder='Password'
					/>
					<input
						name='pin'
						value={this.state.pin}
						onChange={this.handleChange}
						placeholder='4 Digit Pin'
					/>
					<input
						name='office'
						value={this.state.office}
						onChange={this.handleChange}
						placeholder='Office'
					/>
					<button onClick={() => this.onSubmit}>Submit</button>
				</form>
			</div>
		);
	}
}

function mapStateToProps(reduxState) {
	return reduxState;
}

export default connect(
	mapStateToProps,
	{ updateDoctor },
)(DocRegister);
