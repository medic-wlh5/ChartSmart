import React, { Component } from 'react'
import { connect } from 'react-redux';

class PatDash extends Component {
    render() {
        console.log(this.props.patient)
        return (
            <div>
                <h1>PatDash</h1>
            </div>
        )
    }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(PatDash);
