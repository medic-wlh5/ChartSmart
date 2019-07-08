import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import {getVisitId} from '../../../redux/doctorReducer'
import DocNav from '../DocNav/DocNav'
import './NewVisit.css'

//Images
import SitDown from '../../../Assets/SitDown.png'

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
			caseId: null,
			disabled: true, 
			visitId: null
			
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
			[e.target.name]: e.target.value,
			disabled: false
		})
		
	}

	handleSelectedPatient=(e, id, suggestion)=>{
		axios.get(`/api/getcase/${this.props.doctor.id}?id=${id}`)
		.then(res =>{
			this.setState({
				caseId: res.data.case_id,
				selectedPatient: suggestion
			})
		})
	}

	onContinue=(e)=>{
		const {date, caseId}= this.state
		axios.post('/api/newvisit', {date, caseId})
		.then((res)=>{
			this.props.getVisitId(res.data.visit_id)
			this.props.history.push('/newchart')
		})
		.catch(err =>{
			console.log(err)
		})
	}

	render() {
		console.log(this.props.doctor)
		const mappedSuggestions = this.state.suggestions.map((suggestion) => {
			return (
				<div>
					
					<li onClick={(e)=>this.handleSelectedPatient(e,suggestion.id, suggestion)}>
					{suggestion.first_name}
					{suggestion.last_name}
					{suggestion.dob}
					</li>
				</div>
			)
		})
		
		return (
			<div className='page'>
				<DocNav/>
				<div className='visit_container'><img src={SitDown} height='200' width='450'></img>
				<div className='box1'>
				<p>Enter Patient Name</p>
				<input onChange={this.filterPatients} type='text' ref={this.suggestionInput}  />
				{
					this.state.suggestionDropDown ?
					<div className='sug_box'> 
						{mappedSuggestions}
					</div>
					:
					null
				}
				</div>
			
				{this.state.selectedPatient.id  ?
				<div className='box2'>
				<h5>{this.state.selectedPatient.first_name}{this.state.selectedPatient.last_name}{this.state.selectedPatient.dob}</h5>
				<p>Date</p><input placeholder='mm/dd/yyy' name='date' onChange={this.handleDateInput}></input>
				<button disabled={this.state.disabled} onClick={this.onContinue}>
					Continue
				</button>
				</div>
				: 
				null
				}
				</div>
			</div>
		);
	}
}

function mapStateToProps(reduxState) {
	return reduxState;
}

export default connect(mapStateToProps, {getVisitId})(NewVisit);

{/* <img src={Background} height='100%'></img> */}
