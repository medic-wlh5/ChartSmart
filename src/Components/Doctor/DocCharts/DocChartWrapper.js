import React, { Component } from 'react';
import WhiteBloodCell from './Bloodwork/WhiteBloodCell'
import TSH from './Bloodwork/TSH'
import CRP from './Bloodwork/CRP'
import Weight from './Vitals/Weight'
import Temperature from './Vitals/Temperature'
import RestingHeartRate from './Vitals/RestingHeartRate'
import {connect} from 'react-redux'
import axios from 'axios';
import './DocChartWrapper.css'
import DocNav from '../DocNav/DocNav'


class DocChartWrapper extends Component {
	constructor(props) {
        super(props);
        this.suggestionInput=React.createRef()
		this.state = {

            whitebloodcell: false,
            TSH: false,
            CRP: false,
            restingheartrate: false,
            weight: false, 
            temperature: false,
            test: '',
            suggestionDropDown: false, 
            patients: [], 
            selectedPatient: {},
            suggestions: []
		};
    }
    
    componentDidMount(){
        this.suggestionInput.current.addEventListener('focus', ()=>{
            this.setState({
                suggestionDropDown: true
            })
        
        })
        axios.get(`/api/doctor/${this.props.doctor.id}`)
        .then(res=>{
            this.setState({
                patients: res.data
            })
        })

    }
    filterPatients=({target})=>{
        const {value}= target
        let suggestions= this.state.patients.filter((patient)=>{
            return patient.first_name.includes(value)
        })
        this.setState({
            suggestions
        })
    }
    handleSelectedPatient=(e, suggestion)=>{
       this.setState({
           selectedPatient: suggestion,
           suggestions: []
       })
    }
	showWhite = () => {
		this.setState({
            whitebloodcell: true,
            TSH: false,
            CRP: false
		});
    };
    showTSH=()=>{
        this.setState({
            TSH: true,
            whitebloodcell: false,
            CRP: false
        })
    }
    showCRP=()=>{
        this.setState({
            TSH: false, 
            whitebloodcell: false, 
            CRP: true
        })
    }

    
    showResting=()=>{
        this.setState({
            restingheartrate: true,
            weight: false, 
            temperature: false
        })
    }

    showWeight=()=>{
        this.setState({
            restingheartrate: false,
            weight: true,
            temperature: false
        })
    }

    showTemperature=()=>{
        this.setState({
            restingheartrate: false,
            weight: false,
            temperature: true
        })
    }
	handleTestTypeChange = e => {
		this.setState({ test: e.target.value });
	};
	render() {
        console.log(this.state);
        const mappedSuggestions= this.state.suggestions.map((suggestion)=>{
            return(
                <div>
                    <li onClick={(e)=> this.handleSelectedPatient(e, suggestion)}>
                    {`${suggestion.first_name} ${suggestion.last_name} ${suggestion.dob}`}
                    </li>
                </div>    
            )
        })
        
		return (
            <div className='page'>
                <DocNav/>
			<div className='view_chart_page'>
                <div>
                <h1>View Patient Charts</h1>
                <h4>Select Patient to view health charts</h4>
				<input onChange={this.filterPatients} type='text' ref={this.suggestionInput} placeholder='Type in patient name' />
				{
					this.state.suggestionDropDown ?
					<div style={{width: '100vw', height: '30vh'}}> 
						{mappedSuggestions}
					</div>
					:
					null
				}
				</div>

                {this.state.selectedPatient.id ?
                <div>
                <h4>{`See Chart for ${this.state.selectedPatient.first_name} ${this.state.selectedPatient.last_name}`}</h4>
				<form>
					<label>
						Choose test type:
						<select
							value={this.state.test}
							onChange={this.handleTestTypeChange}>
							<option value='' />
							<option value='bloodwork'>Bloodwork</option>
							<option value='vitals'>Vitals</option>
						</select>
					</label>
				</form>
                
				<div className='chartContainer'>
                {this.state.test === 'bloodwork' ?
                <div>
                    
                    <div>
					    <button className='whiteBloodCell' onClick={this.showWhite}>
						White Blood Cell Chart
					    </button>
                        <button onClick={this.showTSH}>
                            TSH Chart
                        </button>
                        <button onClick={this.showCRP}>
                            C Reactive Protein Chart
                        </button>
				    </div>
                <div>
                {this.state.whitebloodcell ? <WhiteBloodCell id={this.state.selectedPatient.id} /> 
                : null}
                
              
                </div>
                
                <div>
                    {this.state.TSH ? 
                    <TSH id={this.state.selectedPatient.id}/> : null}
                </div>
                <div>
                    {this.state.CRP ?
                    <CRP id={this.state.selectedPatient.id} /> : null}
                </div>

                </div>
                :
                null
                }
                {this.state.test === 'vitals' ?
                <>
                <div>
                    <button onClick={this.showResting}>
                        Resting Heart Rate Chart
                    </button>
                    <button onClick={this.showTemperature}>
                        Temperature
                    </button>
                    <button onClick={this.showWeight}>
                        Weight
                    </button>
                </div>
                
                <div>
                    {this.state.restingheartrate ? 
                    <RestingHeartRate id={this.state.selectedPatient.id}/> : null}
                </div>
                <div>
                    {this.state.weight ? 
                    <Weight id={this.state.selectedPatient.id}/> : null}
                </div>
                <div>
                    {this.state.temperature ? 
                    <Temperature id={this.state.selectedPatient.id}/> : null}
                </div>
                </>
                :
                null
                
                }
                </div>
                </div>

                    


                :
                null
           
                

         

                
                }
			</div>
            </div>
		);
	}
}

function mapStateToProps(reduxState){
    return reduxState
}

export default connect(mapStateToProps)(DocChartWrapper)