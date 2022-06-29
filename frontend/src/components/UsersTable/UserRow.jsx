import Button from '../Buttons/Button';
import style from './UserRow.module.css';
import USER_ROLES from '@/lib/constants/UserRoles';
import { useContext } from 'react';
import UserFormsContext from '@/lib/contexts/UserFormsContext';

const UserRow = ({ user }) => {
	const { setEditForm, setDeleteForm } = useContext(UserFormsContext);

	const ROLES = {
		[USER_ROLES.STUDENT]: 'Alumno',
		[USER_ROLES.TEACHER]: 'Profesor',
		[USER_ROLES.OTHER]: 'Otro',
	};

	const { name, username, role, active } = user;
	return (
		<div className={style.card}>
			<div className={style.displayName}>
				<p>{name}</p>
				<p className={style.username}>@{username}</p>
			</div>
			<div className={style.info}>
				<div className={style.activeContainer}>
					<div className={active ? style.active : style.notActive}></div>
					<p>{active ? 'Activo' : 'Inactivo'}</p>
				</div>
				<div className={style.role}>
					<p>{ROLES[role]}</p>
				</div>
				<div className={style.buttons}>
					<Button kind='edit' onClick={() => setEditForm(user)}>
						Editar
					</Button>
					<Button kind='delete' onClick={() => setDeleteForm(user)}>
						Eliminar
					</Button>
				</div>
			</div>
		</div>
	);
};

export default UserRow;
