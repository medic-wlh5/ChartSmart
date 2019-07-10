import React, { Component } from 'react';
import ReactContactForm from 'react-mail-form';
 



export default class Message extends Component {
    render() {
        return (
            <div>
                <ReactContactForm to="address@gmail.com" />
            </div>
        )
    }
}
