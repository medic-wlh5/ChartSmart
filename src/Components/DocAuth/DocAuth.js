import React, { Component } from 'react';

export default class DocAuth extends Component {
    constructor() {
        super()
        this.state = {
            first_name: '',
            last_name: '',
            email: '',
            password: '',
            pin: '',
            office: ''
        }
    }


    render() {
        return(
            <div>
                <form>
                    <input placeholder="First Name"></input>
                    <input placeholder="Last Name"></input>
                    <input placeholder="Email"></input>
                    <input placeholder="Passwork"></input>
                    <input placeholder="4 Digit Pin"></input>
                    <input placeholder="Office"></input>
                    <button></button>
                </form>
            </div>
        )
    }
}