import { useEffect, useState } from 'react';
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

const useCreateForm = () => {
	const [formValues, setFormValues] = useState(initalValues);

	const setName = name => {
		const error = validateName(name);

		setFormValues({
			...formValues,
			name: {
				value: name,
				error,
			},
		});
	};
	const setUsername = username => {
		const error = validateUsername(username);
		const isLoading = error === undefined ? false : !error;

		setFormValues({
			...formValues,
			username: {
				value: username,
				error,
				isLoading,
			},
		});
	};

	const setUsernameError = error =>
		setFormValues(prevUsername => ({
			...prevUsername,
			username: {
				...prevUsername.username,
				error,
				isLoading: false,
			},
		}));

	useEffect(() => {
		if (formValues.username.isLoading) {
			const controller = new AbortController();
			const signal = controller.signal;
			const timeoutID = setTimeout(() => {
				checkUsername(formValues.username.value, setUsernameError, signal);
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

	const resetForm = () => setFormValues(initalValues);

	return { formValues, setName, setUsername, invalidForm, resetForm };
};

const checkUsername = async (username, setUsernameError, signal) => {
	const res = await findUserByUsername(username, signal);
	if (res.aborted) return;
	setUsernameError(res.data.totalUsers > 0 ? 'El usuario ya existe' : false);
};

export default useCreateForm;
