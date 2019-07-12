import React, { Component } from 'react'
import { connect } from 'react-redux';
import PatNav from '../PatNav/PatNav'
import './PatDash.css'

class PatDash extends Component {
    render() {
        console.log(this.props.patient)
        return (
            <div className='page'>
                <PatNav/>
                <div className='pat_dash_info'>
                <h1>Welcome to ChartSmart</h1>
                <p>Click the Chart icon to the left to view your current checkup status</p>
                <p>Click the Dollar Sign to take care of any billing you may need</p>
                <p>Click the calender icon to see when your next visit is</p>
                <p>Click the Chat icon to send your doctors office an email</p>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(PatDash);
