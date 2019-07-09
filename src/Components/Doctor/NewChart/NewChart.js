import React, {Component} from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import 'react-toastify/dist/ReactToastify.min.css';
import { ToastContainer, toast } from 'react-toastify'
import './NewChart.css'
import DocNav from '../DocNav/DocNav'


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

 handleBloodTestChange=(e)=>{
   this.setState({bloodtest: e.target.value})
 }

 handleVitalTestChange=(e)=>{
   this.setState({vitaltest: e.target.value})
 }
 deleteBloodTest=(e, i)=>{
   e.preventDefault()
   let filteredBloodTest= this.state.bloodTestTotals.filter((element, index)=> {
    return index !== i;
   })
   this.setState({bloodTestTotals: filteredBloodTest})
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
   const {bloodTestValues}= this.state
   const visitId= this.props.doctor.visitId
   console.log(visitId)
   axios.post('/api/newchart/bloodwork', {bloodTestValues, visitId})
   .then((res)=>{
     toast('you did it')
      console.log(res)
   })
   .catch(err=>{
     console.log(err)
   })
 }

 handleVitalSubmit=(e)=>{
   const {vitalTestValues}= this.state
   const visitId= this.props.doctor.visitId

   axios.post('/api/newchart/vitals', {vitalTestValues, visitId})
   .then((res)=>{
     console.log(res)
   })
   .catch(err=>{
     console.log(err)
   })
 }

  render(){
    console.log(this.props.doctor.visitId)
    const mappedBloodTestTotals= this.state.bloodTestTotals.map((total, i )=>{
      return(
       <React.Fragment>
       <select value={this.state.bloodtest} onChange={this.handleBloodTestChange}>
          <option value=''>Choose Blood Test</option>
          <option value='white blood cell count'> White blood cell count</option>
          <option value='TSH'>TSH</option>
          <option value='c reactive protein'>C Reactive Protein</option>
          </select>
          <input onChange={this.handleBloodTestValue}></input>
          <button onClick={(e)=>this.deleteBloodTest(e,i)}>Delete Test</button>
       </React.Fragment>
      )
    })

    const mappedVitalTestTotals= this.state.vitalTestTotals.map((total, i)=>{
      return(
        <React.Fragment key={i}>
         <select value={this.state.vitaltest} onChange={this.handleVitalTestChange}>
         <option value=''>Choose Vital to Chart</option>
          <option value='resting heart rate'>Resting heart rate</option>
          <option value='weight'>Weight</option>
          <option value='temperature'>Temperature</option>
          </select>
          <input></input>
          <button onClick={(e)=>this.deleteVitalTest(e,i)}>Delete Test</button>
        </React.Fragment>
      )
    })
    return(
      
      <div className='chart_page'>
       <DocNav/>
        <h1 className='create_title'>Create New Chart</h1>
        
        <form>
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
        <form>
          {mappedBloodTestTotals}
          <button onClick={(e)=>this.handleAddBloodTest(e, this.state.bloodtest, this.state.bloodValue)}>Add more tests</button>
          <button disabled={this.state.bloodSubmit} onClick={this.handleBloodSubmit}>Chart It Real Good</button>
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
    )
  }
}

const mapStateToProps=(reduxState)=>{
  return reduxState
}

export default connect(mapStateToProps)(NewChart)
