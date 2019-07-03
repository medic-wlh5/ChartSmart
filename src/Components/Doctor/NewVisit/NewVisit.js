import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

class NewVisit extends Component {
	constructor(props) {
		super(props);
		this.suggestionInput=React.createRef()
		this.state = {
			suggestions: [],
			patients: [],
			text: '',
			suggestionDropDown: false,
			selectedPatient: {}, 
			date: '',
			case: null
		};
	}
	componentDidMount() {
		this.suggestionInput.current.addEventListener('focus', ()=>{
			this.setState({
				suggestionDropDown: true
			})
		})
		axios
			.get(`/api/doctor/${this.props.doctor.id}`)
			.then(res => {
				
				this.setState({
					patients: res.data,
				});
			})
			.catch(err => console.log(err));
	}


	filterPatients = ({target}) => {
		const {value} = target;
		let suggestions = this.state.patients.filter((patient) => { 
			return patient.first_name.includes(value)
		})
		this.setState({
			suggestions
		});
	}
	


	handleDateInput=(e)=>{
		this.setState({
			[e.target.name]: e.target.value
		})
		
	}

	handleSelectedPatient=(id, suggestion)=>{
		


		axios.get(`/api/getcase/${this.props.doctor.id}?id=${id}`)
		.then(res =>{
			this.setState({
				case: res.data,
				selectedPatient: suggestion
			})
		}	
		)
	}

	render() {

		console.log(this.state)
		const mappedSuggestions = this.state.suggestions.map((suggestion) => {
			return (
				<div>
					
					<li onClick={this.handleSelectedPatient(suggestion.id, suggestion)}>
					{suggestion.first_name}
					{suggestion.last_name}
					{suggestion.dob}
					</li>
				</div>
			)
		})
		
		return (
			<div>
				<p>NewVisit</p>
				
				<div>
				<input onChange={this.filterPatients} type='text' ref={this.suggestionInput}  />
				{
					this.state.suggestionDropDown ?
					<div style={{width: '100vw', height: '30vh'}}> 
						{mappedSuggestions}
					</div>
					:
					null
				}
				</div>
			
				{this.state.selectedPatient.id  ?
				<div>
				<h5>{this.state.selectedPatient.first_name}{this.state.selectedPatient.last_name}{this.state.selectedPatient.dob}</h5>
				<p>Date</p><input placeholder='mm/dd/yyy' name='date' onChange={this.handleDateInput}></input>
				</div>
				: 
				null
				}
			
			</div>
		);
	}
}

function mapStateToProps(reduxState) {
	return reduxState;
}

export default connect(mapStateToProps)(NewVisit);
