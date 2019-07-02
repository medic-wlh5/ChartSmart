// import React, { Component } from 'react'
// import axios from 'axios'
// import { withRouter } from 'react-router-dom'
// import {connect} from 'react-redux';

// class LoginForm extends Component {
//     constructor(){
//         super()
//         this.state = {
//             email: '',
//             password: ''
//         }
//     }

//     handlePatientLogin = (e) => {
//         e.preventDefault()
//         const {email, password} = this.state
//         axios.post('/auth/patientLogin', {email, password}).then((res) => {
//             const {id, email, first_name, last_name} = res.data
//             this.props.login({id, email, first_name, last_name})
//             this.props.history.push('/home')
//         }).catch((err) => {
//             console.log(err)
//         })
//         e.target.email.value = ''
//         e.target.password.value = ''
//     }

//     render() {
//         return (
//             <>
//                 <form className='login_fields' onSubmit={this.handleUserLogin}>
//                     <input
//                         type='text'
//                         name='email'
//                         placeholder='email'
//                         onChange={this.handleLoginInfoUpdate}
//                     />
//                     <input
//                         type='password'
//                         name='password'
//                         placeholder='password'
//                         onChange={this.handleLoginInfoUpdate}
//                     />
//                     <button>Submit</button>


//                 </form>
//             </>
//         )
//     }
// }

// const mapStateToProps = state => state;

// export default withRouter(connect(mapStateToProps)(LoginForm));

// export default withRouter(connect(mapStateToProps, {login})(LoginForm));
