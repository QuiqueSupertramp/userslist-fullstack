import { EDIT_FORM_ACTIONS } from '@/lib/constants/EditFormActions';
import USER_ROLES from '@/lib/constants/UserRoles';
import UserFormsContext from '@/lib/contexts/UserFormsContext';
import useEditForm from '@/lib/hooks/useEditForm';
import { updateUser } from '@/lib/services/api';
import { useContext, useState } from 'react';
import Button from '../Buttons/Button';
import InputCheckbox from '../Forms/InputCheckbox';
import InputText from '../Forms/InputText';
import InputTextAsync from '../Forms/InputTextAsync';
import Select from '../Forms/Select';
import style from './EditUser.module.css';

const EditUser = () => {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const { currentUser, onSuccess } = useContext(UserFormsContext);
	const url = currentUser.url;
	const { formValues, dispatchEditForm, invalidForm } =
		useEditForm(currentUser);

	return (
		<form
			className={style.editForm}
			onSubmit={e => {
				handleEdit(e, formValues, url, onSuccess, setIsSubmitting);
			}}>
			<InputText
				value={formValues.name.value}
				error={formValues.name.error}
				onChange={e =>
					dispatchEditForm({
						type: EDIT_FORM_ACTIONS.NAME,
						value: e.target.value,
					})
				}
			/>
			<InputTextAsync
				error={formValues.username.error}
				isLoading={formValues.username.isLoading}
				value={formValues.username.value}
				onChange={e =>
					dispatchEditForm({
						type: EDIT_FORM_ACTIONS.USERNAME,
						value: e.target.value,
					})
				}
			/>
			<Select
				name='role'
				value={formValues.role}
				onChange={e =>
					dispatchEditForm({
						type: EDIT_FORM_ACTIONS.ROLE,
						value: e.target.value,
					})
				}>
				<option value={USER_ROLES.STUDENT}>Alumno</option>
				<option value={USER_ROLES.TEACHER}>Profesor</option>
				<option value={USER_ROLES.OTHER}>Otro</option>
			</Select>
			<InputCheckbox
				name='active'
				checked={formValues.active}
				onChange={e =>
					dispatchEditForm({
						type: EDIT_FORM_ACTIONS.ACTIVE,
						value: e.target.checked,
					})
				}
				label='¿Activo?'
			/>
			<Button
				type='submit'
				className={style.button}
				disabled={invalidForm || isSubmitting}>
				{!isSubmitting ? 'Editar usuario' : 'Editando...'}
			</Button>
		</form>
	);
};

const updateNewUser = async (formValues, url) => {
	const userToUpdate = {
		name: formValues.name.value,
		username: formValues.username.value,
		role: formValues.role,
		active: formValues.active,
	};

	return await updateUser(url, userToUpdate);
};

const handleEdit = async (e, formValues, url, onSuccess, setIsSubmitting) => {
	e.preventDefault();
	setIsSubmitting(true);

	const { data, error, aborted } = await updateNewUser(formValues, url);

	if (error || aborted) setIsSubmitting(false);
	else onSuccess();

	return { data, error, aborted };
};

export default EditUser;
