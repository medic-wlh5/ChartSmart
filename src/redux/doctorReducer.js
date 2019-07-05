const initialState = {
	id: null,
	first_name: '',
	last_name: '',
	email: '',
	office: '',
	pin: '',
	visitId: null
};

const UPDATE_DOCTOR = 'UPDATE_DOCTOR';
const CLEAR_DOCTOR = 'CLEAR_DOCTOR';
const GET_VISIT_ID= 'GET_VISIT_ID'

export function updateDoctor(doctor) {
	return {
		type: UPDATE_DOCTOR,
		payload: doctor,
	};
}

export function getVisitId(visit_id){
	return{
		type: GET_VISIT_ID,
		payload: visit_id

	}
}

export function clearDoctor() {
	return {
		type: CLEAR_DOCTOR,
	};
}

function reducer(state = initialState, action) {
	switch (action.type) {
		case UPDATE_DOCTOR:
			const {
				id,
				first_name,
				last_name,
				email,
				office,
				pin,
			} = action.payload;
			
			return {...state, id, first_name, last_name, email, office, pin };
		case CLEAR_DOCTOR:
			return { ...initialState };
		case GET_VISIT_ID:
			return {...state, visitId: action.payload}
		default:
			return state;
	}
}

export default reducer;
