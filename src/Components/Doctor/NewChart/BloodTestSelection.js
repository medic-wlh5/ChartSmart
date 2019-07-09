import React, { Component } from 'react'

export default class BloodTestSelection extends Component {
 constructor(){
     super()
     this.state={
         bloodtest: ''
     }
 }  

 handleBloodTestChange=(e)=>{
    this.setState({bloodtest: e.target.value})
  }
    render() {
        return (
        <>    
        <select value={this.state.bloodtest} onChange={this.handleBloodTestChange}>
          <option value=''>Choose Blood Test</option>
          <option value='white blood cell count'> White blood cell count</option>
          <option value='TSH'>TSH</option>
          <option value='c reactive protein'>C Reactive Protein</option>
          </select>
          <input onChange={this.props.handleBloodTestValue}></input>
          <button onClick={(e)=>this.props.deleteBloodTest(e,this.props.i)}>Delete Test</button>
          </>
        )
    }
}
