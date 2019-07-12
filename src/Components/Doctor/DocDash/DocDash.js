import React, { Component } from 'react';
import { clearDoctor } from '../../../redux/doctorReducer';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import DocNav from '../DocNav/DocNav'
import './DocDash.css'

//Images
import VisitBtn from '../../../Assets/ClipTrans.png'
import Docs from '../../../Assets/Docs.png'


class DocDash extends Component {
	render() {
		return (
			<div className='page'>
				<DocNav/>
				<div className='doc_container'>
				{/* <h1 className='dash_title'>New Visit</h1> */}
				<h1> Welcome to ChartSmart </h1>
				<p>To access your current patient's charts click the Chart icon to the left.</p>
				<p>To start a new chart click the "New Visit" button below</p>
				<Link className='clip' to='/newvisit'>
				<button className='clip'><span>New Visit</span><img src={VisitBtn} height='40px' width='30px'></img></button>
				</Link>
				</div>
			</div>
		);
	}
}

function mapStateToProps(reduxState) {
	return reduxState;
}

export default connect(
	mapStateToProps,
	{ clearDoctor },
)(DocDash);
