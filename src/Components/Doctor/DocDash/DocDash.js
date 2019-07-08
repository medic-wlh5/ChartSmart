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
				<div className='container'><img className='doc_img' src={Docs} height='150' width='500'></img>
				<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
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
