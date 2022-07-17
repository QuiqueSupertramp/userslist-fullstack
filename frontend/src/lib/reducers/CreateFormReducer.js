import { CREATE_FORM_ACTIONS } from '../constants/CreateFormActions';
import { validateName, validateUsername } from '../helpers/inputValidations';

export const CREATE_FORM_INITIAL_STATE = {
	name: {
		value: '',
		error: undefined,
	},
	username: {
		value: '',
		error: undefined,
		isLoading: false,
	},
};

export const createFormReducer = (state, action) => {
	switch (action.type) {
		case CREATE_FORM_ACTIONS.NAME: {
			const error = validateName(action.value);
			return { ...state, name: { value: action.value, error } };
		}
		case CREATE_FORM_ACTIONS.USERNAME: {
			const error = validateUsername(action.value);
			const isLoading = error === undefined ? false : !error;
			return {
				...state,
				username: { value: action.value, error, isLoading },
			};
		}
		case CREATE_FORM_ACTIONS.USERNAME_ERROR: {
			return {
				...state,
				username: {
					...state.username,
					error: action.value,
					isLoading: false,
				},
			};
		}

		default:
			throw new Error('Invalid Action');
	}
};
