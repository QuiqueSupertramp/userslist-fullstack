import USER_ROLES from '@/lib/constants/UserRoles';
import useEditForm from '@/lib/hooks/useEditForm';
import { updateUser } from '@/lib/services/api';
import Button from '../Buttons/Button';
import InputCheckbox from '../Forms/InputCheckbox';
import InputText from '../Forms/InputText';
import InputTextAsync from '../Forms/InputTextAsync';
import Select from '../Forms/Select';
import style from './EditUser.module.css';

const EditUser = ({ currentUser, onSuccess }) => {
	const url = currentUser.url;
	const { formValues, setName, setUsername, setRole, setActive, invalidForm } =
		useEditForm(currentUser);

	return (
		<form
			className={style.editForm}
			onSubmit={e => {
				handleEdit(e, formValues, url, onSuccess);
			}}>
			<InputText
				value={formValues.name.value}
				error={formValues.name.error}
				onChange={e => setName(e.target.value)}
			/>
			<InputTextAsync
				error={formValues.username.error}
				isLoading={formValues.username.isLoading}
				value={formValues.username.value}
				onChange={e => setUsername(e.target.value)}
			/>
			<Select
				name='role'
				value={formValues.role}
				onChange={e => setRole(e.target.value)}>
				<option value={USER_ROLES.STUDENT}>Alumno</option>
				<option value={USER_ROLES.TEACHER}>Profesor</option>
				<option value={USER_ROLES.OTHER}>Otro</option>
			</Select>
			<InputCheckbox
				name='active'
				checked={formValues.active}
				onChange={e => setActive(e.target.checked)}
				label='¿Activo?'
			/>
			<Button type='submit' className={style.button} disabled={invalidForm}>
				Editar usuario
			</Button>
		</form>
	);
};

const handleEdit = async (e, formValues, url, onSuccess) => {
	e.preventDefault();

	const userToUpdate = {
		name: formValues.name.value,
		username: formValues.username.value,
		role: e.target.role.value,
		active: e.target.active.checked,
	};

	const { data, error, aborted } = await updateUser(url, userToUpdate);
	if (error || aborted) return { error, aborted };

	onSuccess();

	return { data, error, aborted };
};

export default EditUser;
