import { CREATE_FORM_ACTIONS } from '@/lib/constants/CreateFormActions';
import USER_ROLES from '@/lib/constants/UserRoles';
import UserFormsContext from '@/lib/contexts/UserFormsContext';
import useCreateForm from '@/lib/hooks/useCreateForm';
import { createUser } from '@/lib/services/api';
import { useContext, useState } from 'react';
import Button from '../Buttons/Button';
import InputCheckbox from '../Forms/InputCheckbox';
import InputText from '../Forms/InputText';
import InputTextAsync from '../Forms/InputTextAsync';
import Select from '../Forms/Select';
import style from './CreateUser.module.css';

const CreateUser = () => {
	const { onSuccess } = useContext(UserFormsContext);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const { formValues, dispatchCreateForm, invalidForm } = useCreateForm();

	return (
		<form
			className={style.createForm}
			onSubmit={e =>
				handleSubmit(e, formValues, onSuccess, setIsSubmitting)
			}>
			<InputText
				placeholder='Nombre...'
				value={formValues.name.value}
				error={formValues.name.error}
				onChange={e =>
					dispatchCreateForm({
						type: CREATE_FORM_ACTIONS.NAME,
						value: e.target.value,
					})
				}
			/>
			<InputTextAsync
				placeholder='@Usuario...'
				error={formValues.username.error}
				isLoading={formValues.username.isLoading}
				value={formValues.username.value}
				onChange={e =>
					dispatchCreateForm({
						type: CREATE_FORM_ACTIONS.USERNAME,
						value: e.target.value,
					})
				}
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
				disabled={invalidForm || isSubmitting}
				className={style.button}>
				{!isSubmitting ? 'Crear usuario' : 'Creando...'}
			</Button>
		</form>
	);
};

const createNewUser = async (e, formValues) => {
	const newUser = {
		name: formValues.name.value,
		username: formValues.username.value,
		role: e.target.role.value,
		active: e.target.active.checked,
	};

	return await createUser(newUser);
};

const handleSubmit = async (e, formValues, onSuccess, setIsSubmitting) => {
	e.preventDefault();
	setIsSubmitting(true);

	const { data, error, aborted } = await createNewUser(e, formValues);

	if (error || aborted) setIsSubmitting(false);
	else onSuccess();

	return { data, error, aborted };
};

export default CreateUser;
