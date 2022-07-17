import { useEffect, useReducer } from 'react';
import { CREATE_FORM_ACTIONS } from '../constants/CreateFormActions';
import {
	createFormReducer,
	CREATE_FORM_INITIAL_STATE,
} from '../reducers/CreateFormReducer';
import { findUserByUsername } from '../services/api';

const useCreateForm = () => {
	const [formValues, dispatchCreateForm] = useReducer(
		createFormReducer,
		CREATE_FORM_INITIAL_STATE
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
