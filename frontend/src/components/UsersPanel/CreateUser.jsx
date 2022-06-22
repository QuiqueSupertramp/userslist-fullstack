import USER_ROLES from '@/lib/constants/UserRoles';
import useCreateForm from '@/lib/hooks/useCreateForm';
import { createUser } from '@/lib/services/api';
import Button from '../Buttons/Button';
import InputCheckbox from '../Forms/InputCheckbox';
import InputText from '../Forms/InputText';
import InputTextAsync from '../Forms/InputTextAsync';
import Select from '../Forms/Select';

const CreateUser = ({ reloadUsers, setFilterPanel }) => {
	const { formValues, setName, setUsername, invalidForm, resetForm } =
		useCreateForm();

	return (
		<form
			onSubmit={e =>
				handleSubmit(e, reloadUsers, resetForm, invalidForm, formValues)
			}>
			<InputText
				placeholder='Nombre...'
				value={formValues.name.value}
				error={formValues.name.error}
				onChange={e => setName(e.target.value)}
			/>
			<InputTextAsync
				placeholder='@Usuario...'
				error={formValues.username.error}
				isLoading={formValues.username.isLoading}
				value={formValues.username.value}
				onChange={e => setUsername(e.target.value)}
			/>
			<Select name='role'>
				<option value={USER_ROLES.STUDENT}>Alumno</option>
				<option value={USER_ROLES.TEACHER}>Profesor</option>
				<option value={USER_ROLES.OTHER}>Otro</option>
			</Select>
			<InputCheckbox name='active' label='¿Activo?' />
			<Button type='submit' kind='create' disabled={invalidForm}>
				Crear usuario
			</Button>
		</form>
	);
};

const createNewUser = async (newUser, e, reloadUsers, resetForm) => {
	const { data, error, aborted } = await createUser(newUser);
	if (aborted) return aborted;
	if (error) return error;
	reloadUsers();
	resetForm();
	e.target.reset();
	return data;
};

const handleSubmit = async (
	e,
	reloadUsers,
	resetForm,
	invalidForm,
	formValues
) => {
	e.preventDefault();

	if (invalidForm) return { error: 'Hay errores en el formulario' };

	const newUser = {
		name: formValues.name.value,
		username: formValues.username.value,
		role: e.target.role.value,
		active: e.target.active.checked,
	};
	await createNewUser(newUser, e, reloadUsers, resetForm);
};

export default CreateUser;
