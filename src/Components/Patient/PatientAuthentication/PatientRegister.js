import React, { Component } from 'react'
import axios from 'axios'
import '../PatForm.css'
// import {withRouter} from 'react-router-dom'

class PatientRegister extends Component {
    constructor(){
        super()
        this.state = {
            first_name: '',
            last_name: '',
            email: '',
            password: '',
            DOB: '',
            doctor_pin: '',
        }
    }

    handlePatientRegister = (e) => {
        e.preventDefault()
        const {first_name, last_name, email, password, DOB, doctor_pin} = this.state
        axios.post('auth/patientregister', {first_name, last_name, email, password, DOB, doctor_pin}).then((res) => {
            this.props.history.push('/home')
        }).catch((err) => {
            console.log(err)
        })
        e.target.first_name.value = ''
        e.target.last_name.value = ''
        e.target.email.value = ''
        e.target.password.value = ''
        e.target.DOB.value = ''
        e.target.doctor_pin.value = ''
    }

    handleUserInfoUpdate = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        return (
            <div>
                 <form className='register_fields' 
                    onSubmit={this.handlePatientRegister}>
                    <input 
                    type='text' 
                    placeholder='first name' 
                    name='first_name' 
                    onChange={this.handleUserInfoUpdate}
                    />
                    <input 
                    type='text' 
                    placeholder='last name' 
                    name='last_name' 
                    onChange={this.handleUserInfoUpdate}
                    />
                    <input 
                    type='text' 
                    placeholder='email' 
                    name='email' 
                    onChange={this.handleUserInfoUpdate}
                    />
                    <input 
                    type='text' 
                    placeholder='password' 
                    name='password' 
                    onChange={this.handleUserInfoUpdate}
                    />
                    <input 
                    type='text' 
                    placeholder='Date of Birth' 
                    name='DOB' 
                    onChange={this.handleUserInfoUpdate}
                    />
                    <input 
                    type='text' 
                    placeholder='Doctor Pin' 
                    name='doctor_pin' 
                    onChange={this.handleUserInfoUpdate}
                    />
                <button>Register</button>
                </form>
                
            </div>
        )
    }
}
export default PatientRegister