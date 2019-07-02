import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

class NewVisit extends Component {
	constructor(props) {
		super(props);
		this.state = {
			patients: [],
		};
	}
	componentDidMount() {
		axios
			.get(`/api/doctor/${this.props.doctor.id}`)
			.then(res => {
				this.setState({
					patients: res.data,
				});
			})
			.catch(err => console.log(err));
	}
	render() {
    console.log(this.state);
		return (
			<div>
				<p>NewVisit</p>
			</div>
		);
	}
}

function mapStateToProps(reduxState) {
	return reduxState;
}

export default connect(mapStateToProps)(NewVisit);
