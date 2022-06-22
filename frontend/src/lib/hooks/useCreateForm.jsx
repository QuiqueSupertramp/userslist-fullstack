import { useState } from 'react';

const initalValues = {
	name: {
		value: '',
		error: false,
	},
	username: {
		value: '',
		error: false,
		isLoading: false,
	},
};

const useCreateForm = () => {
	const [formValues, setFormValues] = useState(initalValues);

	const setName = name =>
		setFormValues({
			...formValues,
			name: {
				value: name,
				error: false,
			},
		});
	const setUsername = username =>
		setFormValues({
			...formValues,
			username: {
				...formValues.username,
				value: username,
			},
		});

	const invalidForm =
		formValues.name.error ||
		formValues.username.error ||
		formValues.username.isLoading;

	const resetForm = () => setFormValues(initalValues);

	return { formValues, setName, setUsername, invalidForm, resetForm };
};

export default useCreateForm;
