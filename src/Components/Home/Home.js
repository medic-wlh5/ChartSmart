import React, { Component } from 'react'
import './Home.css'
import {Link} from 'react-router-dom'


//images
import Logo from '../../Assets/IconTrans2.png'
import CS from '../../Assets/ChartSmart2.png'

export default class Home extends Component {
    render() {
        return (
            <div className='landing_page'>
                <div className='header'><img src={CS} height='150' width='400'></img><h1>Fast & Easy Doctor To Patient Information</h1></div>
                <div className='landing_container'><h3>Lets get you started!</h3><h4>Are you a</h4>
                <Link  className='doc_link' to='/doctorlogin'>Doctor</Link>
                <h4>or a</h4>
                <Link className='pat_link' to='/patientlogin'>Patient</Link>
                </div>
                <div class='ripple-background'>
                  <div class='circle xxlarge shade1'></div>
                  <div class='circle xlarge shade2'></div>
                  <div class='circle large shade3'></div>
                  <div class='circle mediun shade4'></div>
                  <div class='circle small shade5'></div>
                </div>
            </div>
        )
    }
}
