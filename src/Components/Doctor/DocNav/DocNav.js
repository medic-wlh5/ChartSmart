import React, { Component } from 'react'
import './DocNav.css'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom'
import axios from 'axios'
import {clearDoctor} from '../../../redux/doctorReducer'

//Icons
import Home from '../../../Assets/HomeTrans.png'
import Chart from '../../../Assets/ChartTrans2.png'
import Calender from '../../../Assets/CalTrans2.png'
import Chat from '../../../Assets/ChatTrans2.png'
import DocProf from '../../../Assets/DocProf.png'


class DocNav extends Component {
    handleLogout = () => {
		this.props.clearDoctor();
		axios.get('/auth/logout').catch(err => {
			console.log(err);
		});
	};
    render() {
        return (
            <div>
                <div className='nav_menu'>
                        <Link to='/doctordashboard' className='nav_icons'>
                        <button className='icons'><img src={Home} height='60px' width='70px'></img></button>
                        </Link>
                        <Link to='/doctorviewcharts' className='nav_icons'>
                        <button className='icons'><img src={Chart} height='60px' width='70px'></img></button>
                        </Link>
                        <button className='icons'><img src={Calender} height='60px' width='70px'></img></button>
                        <button className='icons'><img src={Chat} height='60px' width='70px'></img></button>
                        <button className='icons'><img src={DocProf} height='60px' width='60px'></img></button>
                        <Link to='/' className='logout'>
					    <button onClick={this.handleLogout}>Logout</button>
				        </Link>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => state;

export default withRouter(
	connect(
		mapStateToProps,
		{ clearDoctor },
	)(DocNav),
);