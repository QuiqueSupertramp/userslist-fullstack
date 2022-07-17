import { useEffect, useReducer } from 'react';
import { EDIT_FORM_ACTIONS } from '../constants/EditFormActions';
import { validateName, validateUsername } from '../helpers/inputValidations';
import { findUserByUsername } from '../services/api';

const editFormReducer = (state, action) => {
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

const useEditForm = currentUser => {
	const [formValues, dispatchEditForm] = useReducer(
		editFormReducer,
		currentUser,
		getInitialState
	);

	const initialValues =
		currentUser.name === formValues.name.value &&
		currentUser.username === formValues.username.value &&
		currentUser.role === formValues.role &&
		currentUser.active === formValues.active;

	const invalidForm =
		formValues.name.error ||
		formValues.name.value.length === 0 ||
		formValues.username.error ||
		formValues.username.value.length === 0 ||
		formValues.username.isLoading ||
		initialValues;

	useEffect(() => {
		dispatchEditForm({ type: EDIT_FORM_ACTIONS.REPLACE, value: currentUser });
	}, [currentUser]);

	useEffect(() => {
		if (formValues.username.isLoading) {
			const controller = new AbortController();
			const signal = controller.signal;

			if (currentUser.username === formValues.username.value)
				dispatchEditForm({
					type: EDIT_FORM_ACTIONS.USERNAME_ERROR,
					value: false,
				});

			checkUserAsync(dispatchEditForm, formValues.username.value, signal);
			return () => controller.abort();
		}
	}, [
		formValues.username.isLoading,
		formValues.username.value,
		currentUser.username,
	]);

	return { formValues, dispatchEditForm, invalidForm };
};

const checkUserAsync = async (dispatchEditForm, username, signal) => {
	const res = await findUserByUsername(username, signal);
	if (res.aborted) return;
	dispatchEditForm({
		type: EDIT_FORM_ACTIONS.USERNAME_ERROR,
		value: res.data.totalUsers > 0 ? 'El usuario ya existe' : false,
	});
};

const getInitialState = currentUser => ({
	name: { value: currentUser.name, error: false },
	username: {
		value: currentUser.username,
		error: false,
		isLoading: false,
	},
	role: currentUser.role,
	active: currentUser.active,
});

export default useEditForm;
