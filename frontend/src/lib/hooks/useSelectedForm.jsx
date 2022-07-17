import { useState } from 'react';
import { USER_FORMS } from '../constants/UserForms';

const useSelectedForm = () => {
	const [selectedForm, setSelectedForm] = useState({
		form: USER_FORMS.FILTERS,
	});

	const setFilterForm = () => setSelectedForm({ form: USER_FORMS.FILTERS });
	const setCreateForm = () => setSelectedForm({ form: USER_FORMS.CREATE });
	const setEditForm = currentUser =>
		setSelectedForm({ form: USER_FORMS.EDIT, currentUser });
	const setDeleteForm = currentUser =>
		setSelectedForm({ form: USER_FORMS.DELETE, currentUser });

	return {
		currentForm: selectedForm.form,
		currentUser: selectedForm.currentUser,
		setFilterForm,
		setCreateForm,
		setEditForm,
		setDeleteForm,
	};
};

export default useSelectedForm;
