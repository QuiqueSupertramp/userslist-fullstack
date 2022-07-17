import { useEffect, useReducer } from 'react';
import { CREATE_FORM_ACTIONS } from '../constants/CreateFormActions';
import { validateName, validateUsername } from '../helpers/inputValidations';
import { findUserByUsername } from '../services/api';

const initalValues = {
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

const createFormReducer = (state, action) => {
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

const useCreateForm = () => {
	const [formValues, dispatchCreateForm] = useReducer(
		createFormReducer,
		initalValues
	);

	useEffect(() => {
		if (formValues.username.isLoading) {
			const controller = new AbortController();
			const signal = controller.signal;
			const timeoutID = setTimeout(() => {
				checkUsername(
					formValues.username.value,
					dispatchCreateForm,
					signal
				);
			}, 300);

			return () => {
				controller.abort();
				clearTimeout(timeoutID);
			};
		}
	}, [formValues.username.isLoading, formValues.username.value]);

	const invalidForm =
		formValues.name.error ||
		formValues.name.value.length === 0 ||
		formValues.username.error ||
		formValues.username.value.length === 0 ||
		formValues.username.isLoading;

	return { formValues, dispatchCreateForm, invalidForm };
};

const checkUsername = async (username, dispatchCreateForm, signal) => {
	const res = await findUserByUsername(username, signal);
	if (res.aborted) return;
	dispatchCreateForm({
		type: CREATE_FORM_ACTIONS.USERNAME_ERROR,
		value: res.data.totalUsers > 0 ? 'El usuario ya existe' : false,
	});
};

export default useCreateForm;
