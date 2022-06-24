import USER_ROLES from '@/lib/constants/UserRoles';
import useCreateForm from '@/lib/hooks/useCreateForm';
import { createUser } from '@/lib/services/api';
import Button from '../Buttons/Button';
import InputCheckbox from '../Forms/InputCheckbox';
import InputText from '../Forms/InputText';
import InputTextAsync from '../Forms/InputTextAsync';
import Select from '../Forms/Select';
import style from './CreateUser.module.css';

const CreateUser = ({ onSuccess }) => {
	const { formValues, setName, setUsername, invalidForm } = useCreateForm();

	return (
		<form
			className={style.createForm}
			onSubmit={e => handleSubmit(e, formValues, onSuccess)}>
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
			<Button
				type='submit'
				kind='create'
				disabled={invalidForm}
				className={style.button}>
				Crear usuario
			</Button>
		</form>
	);
};

const createNewUser = async (e, formValues, onSuccess) => {
	const newUser = {
		name: formValues.name.value,
		username: formValues.username.value,
		role: e.target.role.value,
		active: e.target.active.checked,
	};

	const { data, error, aborted } = await createUser(newUser);
	if (aborted) return aborted;
	if (error) return error;

	onSuccess();

	return { data, error, aborted };
};

const handleSubmit = async (e, formValues, onSuccess) => {
	e.preventDefault();
	return await createNewUser(e, formValues, onSuccess);
};

export default CreateUser;
