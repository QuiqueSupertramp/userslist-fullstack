import { useEffect, useState } from 'react';
import { validateName, validateUsername } from '../helpers/inputValidations';
import { findUserByUsername } from '../services/api';

const useEditForm = currentUser => {
	const [formValues, setFormValues] = useState(() =>
		initialState(currentUser)
	);

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

		setFormValues({
			...formValues,
			username: {
				value: username,
				error,
				isLoading: error === undefined ? false : !error,
			},
		});
	};

	const setUsernameError = error =>
		setFormValues(prevFormValues => ({
			...prevFormValues,
			username: {
				...prevFormValues.username,
				error,
				isLoading: false,
			},
		}));

	const setRole = role => setFormValues({ ...formValues, role });
	const setActive = active => setFormValues({ ...formValues, active });

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
		setFormValues(() => initialState(currentUser));
	}, [currentUser]);

	useEffect(() => {
		if (formValues.username.isLoading) {
			const controller = new AbortController();
			const signal = controller.signal;

			if (currentUser.username === formValues.username.value)
				setUsernameError(false);

			checkUserAsync(setUsernameError, formValues.username.value, signal);
			return () => controller.abort();
		}
	}, [
		formValues.username.isLoading,
		formValues.username.value,
		currentUser.username,
	]);

	return { formValues, setName, setUsername, setRole, setActive, invalidForm };
};

const checkUserAsync = async (setUsernameError, username, signal) => {
	const res = await findUserByUsername(username, signal);
	if (res.aborted) return;
	setUsernameError(res.data.totalUsers > 0 ? 'El usuario ya existe' : false);
};

const initialState = currentUser => ({
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
