import React, { Component } from 'react';
import axios from 'axios';

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

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit = () => {
        axios.post('/auth/doctorregister').then(res => res.data)
    }


    render() {
        return(
            <div>
                <form onSubmit={this.onSubmit}>
                    <input name="first_name" value={this.state.first_name} onChange={this.handleChange} placeholder="First Name"></input>
                    <input name="last_name" value={this.state.last_name} onChange={this.handleChange} placeholder="Last Name"></input>
                    <input name="email" value={this.state.email} onChange={this.handleChange} placeholder="Email"></input>
                    <input name="password" value={this.state.password} onChange={this.handleChange} placeholder="Password"></input>
                    <input name="pin" value={this.state.pin} onChange={this.handleChange} placeholder="4 Digit Pin"></input>
                    <input name="office" value={this.state.office} onChange={this.handleChange} placeholder="Office"></input>
                    <button onClick={() => this.onSubmit}>Submit</button>
                </form>
            </div>
        )
    }
}