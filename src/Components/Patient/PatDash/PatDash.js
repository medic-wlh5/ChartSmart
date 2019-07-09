import React, { Component } from 'react'
import { connect } from 'react-redux';
import PatNav from '../PatNav/PatNav'

class PatDash extends Component {
    render() {
        console.log(this.props.patient)
        return (
            <div className='page'>
                <PatNav/>
            </div>
        )
    }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(PatDash);
