const initialState = {
	first_name: '',
	last_name: '',
	email: '',
	dob: '',
	id: '',
};

const UPDATE_USER = 'UPDATE_USER';

export function updateUser(user) {
	return {
		type: UPDATE_USER,
		payload: user,
	};
}

function reducer(state = initialState, action) {
	switch (action.type) {
		case UPDATE_USER:
			const { first_name, last_name, email, dob, id } = action.payload;
			return { first_name, last_name, email, dob, id };
		default:
			return state;
	}
}

export default reducer;
