import { USER_FORMS } from '@/lib/constants/UserForms';
import UserFormsContext from '@/lib/contexts/UserFormsContext';
import { useContext } from 'react';
import IconButton from '../Buttons/IconButton';
import CrossIcon from '../Icons/CrossIcon';
import CreateUser from './CreateUser';
import DeleteUser from './DeleteUser';
import EditUser from './EditUser';
import Filters from './Filters';
import style from './UsersFormContainer.module.css';

const FORM_TO_SHOW = {
	[USER_FORMS.CREATE]: { form: <CreateUser />, style: style.create },
	[USER_FORMS.EDIT]: { form: <EditUser />, style: style.edit },
	[USER_FORMS.DELETE]: { form: <DeleteUser />, style: style.delete },
};

const UsersFormContainer = ({ filters, dispatchFilters }) => {
	const { setFilterForm, currentForm } = useContext(UserFormsContext);

	const formStyle = FORM_TO_SHOW[currentForm]?.style;
	const Form = FORM_TO_SHOW[currentForm]?.form;

	return (
		<div className={`${style.usersFormContainer} ${formStyle}`}>
			{Form && (
				<IconButton
					icon={CrossIcon}
					className={style.cancel}
					onClick={setFilterForm}
				/>
			)}
			<Filters {...filters} dispatchFilters={dispatchFilters} />
			{Form}
		</div>
	);
};

export default UsersFormContainer;
