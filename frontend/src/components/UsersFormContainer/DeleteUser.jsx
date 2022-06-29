import UserFormsContext from '@/lib/contexts/UserFormsContext';
import { deleteUser } from '@/lib/services/api';
import { useContext, useState } from 'react';
import Button from '../Buttons/Button';
import style from './DeleteUser.module.css';

const DeleteUser = () => {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const { currentUser, onSuccess } = useContext(UserFormsContext);
	const { name, url } = currentUser;

	return (
		<div className={style.deleteUser}>
			<p>
				¿Estás seguro que quieres eliminar al usuario {'"'}
				{name}
				{'"'}?
			</p>
			<Button
				kind='delete'
				disabled={isSubmitting}
				onClick={e => handleDelete(e, url, onSuccess, setIsSubmitting)}>
				{!isSubmitting ? 'Eliminar usuario' : 'Eliminando...'}
			</Button>
		</div>
	);
};

const handleDelete = async (e, url, onSuccess, setIsSubmitting) => {
	e.preventDefault();
	setIsSubmitting(true);

	const { data, error, aborted } = await deleteUser(url);

	if (error || aborted) setIsSubmitting(false);
	else onSuccess();

	return { data, error, aborted };
};

export default DeleteUser;
