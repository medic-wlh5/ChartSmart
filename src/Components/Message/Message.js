import React, { Component } from 'react';
import PatNav from '../Patient/PatNav/PatNav';
import './Message.css';
 



export default class Message extends Component {
    
    render() {
        return (
            <div className="page-message">
                <PatNav />
                <div className="email-form">
                
                </div>
            </div>
        )
    }
}
