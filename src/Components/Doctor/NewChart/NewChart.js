import React, {Component} from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import BloodTestSelection from './BloodTestSelection';
import VitalTestSelection from './VitalTestSelection';
import 'react-toastify/dist/ReactToastify.min.css';
import { ToastContainer, toast } from 'react-toastify'
import './NewChart.css'
import DocNav from '../DocNav/DocNav'

toast.configure()
class  NewChart extends Component  {
 constructor(){
   super()
   this.state={
    testtype: '',
    bloodtest: '',
    vitaltest: '',
    bloodTestTotals: [1],
    vitalTestTotals: [1],
    vitalSubmit: true,
    bloodSubmit: true,
    vitalValue: '',
    bloodValue: '',
    bloodTestValues:[], 
    vitalTestValues: []
   }
 }



 handleTestTypeChange=(e)=>{
   this.setState({testtype: e.target.value})
 }

 handleBloodTestChange=(value)=>{

  this.setState({bloodtest: value})
}
handleVitalTestChange=(value)=>{

  this.setState({vitaltest: value})
}


 deleteBloodTest=(e, i)=>{
   e.preventDefault()
   let filterArray = this.state.bloodTestTotals.filter((ele, ind) => {
     return ind !== i;
   });
   console.log(filterArray)
   this.setState({bloodTestTotals: filterArray})
 }

 deleteVitalTest=(e, i)=>{
   e.preventDefault()
   let filteredVitalTest= this.state.vitalTestTotals.filter((element, index)=>{
     return index !==i
   })
   this.setState({vitalTestTotals: filteredVitalTest})
 }

 handleBloodTestValue=(e)=>{
   this.setState({
     bloodValue: e.target.value
   })
   if(this.state.bloodValue.length > 0){
    this.setState({
      bloodSubmit: false
    })
  }
 }

 handleVitalTestValue=(e)=>{
   this.setState({
     vitalValue: e.target.value
   })
   if(this.state.vitalValue.length > 0){
     this.setState({
       vitalSubmit: false
     })
   }
 }

 handleAddBloodTest=(e, bloodTest, bloodValue)=>{
  e.preventDefault()
  const bloodTestsToChart={testName:bloodTest, testValue: bloodValue}
  this.state.bloodTestValues.push(bloodTestsToChart)
 
  this.setState({
      bloodTestTotals: [...this.state.bloodTestTotals, 1], 
      bloodValue: '', 
      bloodSubmit: true })
 }

 handleAddVitalTest=(e, vitalTest, vitalValue)=>{
   e.preventDefault()
   const vitalTestsToChart={testName: vitalTest, testValue: vitalValue}
   this.state.vitalTestValues.push(vitalTestsToChart)

   this.setState({
     vitalTestTotals: [...this.state.vitalTestTotals, 1],
     vitalValue: '',
     vitalSubmit: true
   })
 }

 handleBloodSubmit=(e)=>{
   e.preventDefault()
 
   if(this.state.bloodtest){
    const bloodTestsToChart={testName: this.state.bloodtest, testValue: this.state.bloodValue}
    this.state.bloodTestValues.push(bloodTestsToChart)
   }
   console.log(this.state.bloodTestValues)
   const {bloodTestValues}= this.state
   const visitId= this.props.doctor.visitId
   
   axios.post('/api/newchart/bloodwork', {bloodTestValues, visitId})
   .then((res)=>{
     toast('Bloodwork Charted Sucessfully')
      this.props.history.push('/doctordashboard')
   })
   .catch(err=>{
     toast('Oops, something went wrong')
   })
 }

 handleVitalSubmit=(e)=>{

  if(this.state.vitaltest ){
    const bloodTestsToChart={testName: this.state.bloodtest, testValue: this.state.bloodValue}
    this.state.bloodTestValues.push(bloodTestsToChart)
   }
   const {vitalTestValues}= this.state
   const visitId= this.props.doctor.visitId

   axios.post('/api/newchart/vitals', {vitalTestValues, visitId})
   .then((res)=>{
    toast('Vitals Charted Sucessfully')
    this.props.history.push('/doctordashboard')
   })
   .catch(err=>{
    toast('Oops, something went wrong')
   })
 }

  render(){
    
    const mappedBloodTestTotals= this.state.bloodTestTotals.map((total, i )=>{
      return(
       <BloodTestSelection key={i} handleBloodTestChange={this.handleBloodTestChange} handleBloodTestValue={this.handleBloodTestValue} deleteBloodTest={this.deleteBloodTest} i={i}/>
      )
    })

    const mappedVitalTestTotals= this.state.vitalTestTotals.map((total, i)=>{
      return(
       <VitalTestSelection handleVitalTestValue={this.handleVitalTestValue} deleteVitalTest={this.deleteVitalTest} i={i} handleVitalTestChange={this.handleVitalTestChange}/>
      )
    })
    console.log(this.state.bloodTestTotals)
    return(
      
      <div className='chart_page'>
       <DocNav/>
       <div className='new_chart_container'>
        <h1 className='create_title'>Create New Chart</h1>
       <div className='form_contianer'>
        
        <form className='new_chart_form'>
        <label>
        Choose test type:
        
          <select className='chart_dropdown' value={this.state.testtype} onChange={this.handleTestTypeChange}>
          <option value=''></option>
          <option value='bloodwork'>Blood work</option>
          <option value='vitals'>Vitals</option>
          </select>
        </label>
        </form>
        {this.state.testtype === 'bloodwork' ?
        <form className='form_options'>
          {mappedBloodTestTotals}
          <button className='new_chart_btns' onClick={(e)=>this.handleAddBloodTest(e, this.state.bloodtest, this.state.bloodValue)}>Add more tests</button>
          <button className='new_chart_btns' disabled={this.state.bloodSubmit} onClick={this.handleBloodSubmit}>Submit</button>
        </form>
        :
        null
        }
        {this.state.testtype ==='vitals' ?
        <form>
          {mappedVitalTestTotals}
          <button onClick={(e)=>this.handleAddVitalTest(e, this.state.vitaltest, this.state.vitalValue)}>Add test</button>
          <button disabled={this.state.vitalSubmit} onClick={this.handleVitalSubmit}>Chart It Real Good</button>
        </form>
        :
        null

        }
        </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps=(reduxState)=>{
  return reduxState
}

export default connect(mapStateToProps)(NewChart)
