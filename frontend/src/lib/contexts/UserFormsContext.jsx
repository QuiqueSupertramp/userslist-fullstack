import { createContext } from 'react';
import useSelectedForm from '../hooks/useSelectedForm';

const UserFormsContext = createContext();

const UserFormProvider = ({ children, reloadUsers, resetFilters }) => {
	const {
		currentForm,
		currentUser,
		setFilterForm,
		setCreateForm,
		setEditForm,
		setDeleteForm,
	} = useSelectedForm();

	const onSuccess = () => {
		reloadUsers();
		resetFilters();
		setFilterForm();
	};

	const data = {
		currentForm,
		currentUser,
		setFilterForm,
		setCreateForm,
		setEditForm,
		setDeleteForm,
		onSuccess,
	};

	return (
		<UserFormsContext.Provider value={data}>
			{children}
		</UserFormsContext.Provider>
	);
};

export { UserFormProvider };
export default UserFormsContext;
