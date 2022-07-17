import { useEffect, useReducer } from 'react';
import { EDIT_FORM_ACTIONS } from '../constants/EditFormActions';
import { editFormReducer, getInitialState } from '../reducers/EditFormReducer';
import { findUserByUsername } from '../services/api';

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

export default useEditForm;
