import { deleteUser } from '@/lib/services/api';
import Button from '../Buttons/Button';
import style from './DeleteUser.module.css';

const DeleteUser = ({ currentUser, onSuccess }) => {
	const { name, url } = currentUser;
	return (
		<div className={style.deleteUser}>
			<p>
				¿Estás seguro que quieres eliminar al usuario {'"'}
				{name}
				{'"'}?
			</p>
			<Button kind='delete' onClick={() => handleDelete(url, onSuccess)}>
				Eliminar usuario
			</Button>
		</div>
	);
};

const handleDelete = async (url, onSuccess) => {
	const { data, error, aborted } = await deleteUser(url);
	if (error || aborted) return { error, aborted };

	onSuccess();

	return { data };
};

export default DeleteUser;
