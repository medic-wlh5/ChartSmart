const initialState = {
	id: '',
	first_name: '',
	last_name: '',
	email: '',
	password: '',
	office: '',
	pin: '',
};

const REGISTER_DOCTOR = 'REGISTER_DOCTOR';
const CLEAR_DOCTOR = 'CLEAR_DOCTOR';

export function registerDoctor(doctor) {
	return {
		type: REGISTER_DOCTOR,
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
		case REGISTER_DOCTOR:
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
