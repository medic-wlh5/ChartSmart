import React, { Component } from 'react'
import './PatNav.css'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom'
import axios from 'axios'
import {clearUser} from '../../../redux/patientReducer'

//Icons
import Logo from '../../../Assets/IconTrans2.png'
import Chart from '../../../Assets/ChartTrans2.png'
import BillPay from '../../../Assets/BPTrans2.png'
import Calender from '../../../Assets/CalTrans2.png'
import Chat from '../../../Assets/ChatTrans2.png'
import Profile from '../../../Assets/ProfTrans2.png'


class PatNav extends Component {
    handleLogout = () => {
		this.props.clearUser();
		axios.get('/auth/logout').catch(err => {
			console.log(err);
		});
	};
    render() {
        return (
            <div>
                <div className='pat_nav_menu'>
                        <Link to='/patientdashboard' className='pat_nav_icons'>
                        <button className='pat_icons'><img src={Logo} height='90px' width='100px'></img></button>
                        </Link>
                        <Link to='/patchart' className='pat_nav_icons'>
                        <button className='pat_icons'><img src={Chart} height='60px' width='70px'></img></button>
                        </Link>
                        <button className='pat_icons'><img src={BillPay} height='60px' width='60px'></img></button>
                        <Link to='./calender' className='pat_nav_icons'>
                        <button className='pat_icons'><img src={Calender} height='60px' width='70px'></img></button>
                        </Link>
                        <Link to='/message' className='pat_nav_icons'>
                        <button className='pat_icons'><img src={Chat} height='60px' width='70px'></img></button>
                        </Link>
                        <button className='pat_icons'><img src={Profile} height='60px' width='60px'></img></button>
                        <Link to='/' className='pat_logout'>
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
		{ clearUser },
	)(PatNav),
);