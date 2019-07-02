import { createStore } from 'redux';
import patientReducer from './patientReducer';
import doctorReducer from './doctorReducer';

const rootReducer = combineReducers({
    patient: patientReducer,
    doctor: doctorReducer
})


export default createStore(rootReducer)
