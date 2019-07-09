import React, { Component } from 'react'

export default class VitalTestSelection extends Component {
    constructor(){
        super()
        this.state={
            vitaltest: ''
        }
    }

handleVitalTestChange=(e)=>{
    this.setState({vitaltest: e.target.value})
      }

    render() {
        return (
            <>
        <select value={this.state.vitaltest} onChange={this.handleVitalTestChange}>
            <option value=''>Choose Vital to Chart</option>
            <option value='resting heart rate'>Resting heart rate</option>
            <option value='weight'>Weight</option>
            <option value='temperature'>Temperature</option>
        </select>
          <input onChange={this.props.handleVitalTestValue}></input>
          <button onClick={(e)=>this.props.deleteVitalTest(e, this.props.i)}>Delete Test</button>
            </>
        )
    }
}
