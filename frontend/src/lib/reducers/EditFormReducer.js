import { EDIT_FORM_ACTIONS } from '../constants/EditFormActions';
import { validateName, validateUsername } from '../helpers/inputValidations';

export const getInitialState = currentUser => ({
	name: { value: currentUser.name, error: false },
	username: {
		value: currentUser.username,
		error: false,
		isLoading: false,
	},
	role: currentUser.role,
	active: currentUser.active,
});

export const editFormReducer = (state, action) => {
	switch (action.type) {
		case EDIT_FORM_ACTIONS.NAME: {
			const error = validateName(action.value);
			return {
				...state,
				name: {
					value: action.value,
					error,
				},
			};
		}
		case EDIT_FORM_ACTIONS.USERNAME: {
			const error = validateUsername(action.value);
			return {
				...state,
				username: {
					value: action.value,
					error,
					isLoading: error === undefined ? false : !error,
				},
			};
		}
		case EDIT_FORM_ACTIONS.USERNAME_ERROR:
			return {
				...state,
				username: {
					...state.username,
					error: action.value,
					isLoading: false,
				},
			};
		case EDIT_FORM_ACTIONS.ROLE:
			return {
				...state,
				role: action.value,
			};
		case EDIT_FORM_ACTIONS.ACTIVE:
			return {
				...state,
				active: action.value,
			};
		case EDIT_FORM_ACTIONS.REPLACE:
			return getInitialState(action.value);

		default:
			throw new Error('Invalid Action');
	}
};
