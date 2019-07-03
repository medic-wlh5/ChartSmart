const initialState = {
	id: null,
	first_name: '',
	last_name: '',
	email: '',
	office: '',
	pin: '',
};

const UPDATE_DOCTOR = 'UPDATE_DOCTOR';
const CLEAR_DOCTOR = 'CLEAR_DOCTOR';

export function updateDoctor(doctor) {
	return {
		type: UPDATE_DOCTOR,
		payload: doctor,
	};
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
				password,
				office,
				pin,
			} = action.payload;
			
			return { id, first_name, last_name, email, password, office, pin };
		case CLEAR_DOCTOR:
			return { ...initialState };
		default:
			return state;
	}
}

export default reducer;
