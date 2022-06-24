import { useState } from 'react';
import { PANELS } from '../constants/Panels';

const useForms = () => {
	const [form, setForm] = useState({
		panel: PANELS.FILTERS,
		currentUser: {},
	});

	const setFilterForm = () =>
		setForm({
			panel: PANELS.FILTERS,
			currentUser: {},
		});
	const setCreateForm = () =>
		setForm({
			panel: PANELS.CREATE,
			currentUser: {},
		});
	const setEditForm = currentUser =>
		setForm({
			panel: PANELS.EDIT,
			currentUser,
		});
	const setDeleteForm = currentUser =>
		setForm({
			panel: PANELS.DELETE,
			currentUser,
		});

	return {
		form,
		setFilterForm,
		setCreateForm,
		setEditForm,
		setDeleteForm,
	};
};

export default useForms;
