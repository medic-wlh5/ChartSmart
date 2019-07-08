import React, { Component } from 'react'
import './DocNav.css'
import {Link} from 'react-router-dom'

//Icons
import Logo from '../../../Assets/IconTrans2.png'
import Chart from '../../../Assets/ChartTrans2.png'
import Calender from '../../../Assets/CalTrans2.png'
import Chat from '../../../Assets/ChatTrans2.png'
import DocProf from '../../../Assets/DocProf.png'


export default class DocNav extends Component {
    render() {
        return (
            <div>
                <div className='nav_menu'>
                        <Link to='/doctordashboard'>
                        <button className='icons'><img src={Logo} height='90px' width='100px'></img></button>
                        </Link>
                        <button className='icons'><img src={Chart} height='60px' width='70px'></img></button>
                        <button className='icons'><img src={Calender} height='60px' width='70px'></img></button>
                        <button className='icons'><img src={Chat} height='60px' width='70px'></img></button>
                        <button className='icons'><img src={DocProf} height='60px' width='60px'></img></button>
                </div>
            </div>
        )
    }
}
