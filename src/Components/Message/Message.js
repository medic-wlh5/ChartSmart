import React, { Component } from 'react';
import ReactContactForm from 'react-mail-form';
import PatNav from '../Patient/PatNav/PatNav';
import './Message.css';
 



export default class Message extends Component {
    
    render() {
        // const emailStyle = {
        //     display: 'flex',
        //     flexDirection: 'column'
        // }
        return (
            <div className="page-message">
                <PatNav />
                <div className="email-form">
                <ReactContactForm to="address@gmail.com" className="react-contact-form" />
                </div>
            </div>
        )
    }
}
