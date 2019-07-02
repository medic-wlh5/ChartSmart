import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './Components/Home/Home';
import DocLogin from './Components/Doctor/DocAuth/DocLogin';
import PatientLogin from './Components/Patient/PatientAuthentication/PatientLogin';
import DocRegister from './Components/Doctor/DocAuth/DocRegister';
import PatientRegister from './Components/Patient/PatientAuthentication/PatientRegister';
import DocDash from './Components/Doctor/DocDash/DocDash';
import PatDash from './Components/Patient/PatDash/PatDash';





export default (
    <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/doctorlogin" component={DocLogin} />
        <Route path="/patientlogin" component={PatientLogin} />
        <Route path="/doctorregister" component={DocRegister} />
        <Route path="/patientregister" component={PatientRegister} />
        <Route path="/doctordashboard" component={DocDash} />
        <Route path="/patientdashboard" component={PatDash} />
    </Switch>
)