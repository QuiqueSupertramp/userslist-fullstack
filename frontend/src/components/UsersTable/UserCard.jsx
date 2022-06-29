import USER_ROLES from '@/lib/constants/UserRoles';
import style from './UserCard.module.css';
import IconButton from '../Buttons/IconButton';
import EditIcon from '../Icons/EditIcon';
import DeleteIcon from '../Icons/DeleteIcon';
import { useContext } from 'react';
import UserFormsContext from '@/lib/contexts/UserFormsContext';

const ROLES = {
	[USER_ROLES.STUDENT]: 'Alumno',
	[USER_ROLES.TEACHER]: 'Profesor',
	[USER_ROLES.OTHER]: 'Otro',
};

const UserCard = ({ user }) => {
	const { setEditForm, setDeleteForm } = useContext(UserFormsContext);
	const { name, username, role, active } = user;

	return (
		<div className={style.card}>
			<div className={style.displayName}>
				<p>{name}</p>
				<p className={style.username}>@{username}</p>
			</div>
			<div className={style.info}>
				<div className={style.role}>
					<p>{ROLES[role]}</p>
				</div>
				<div className={style.activeContainer}>
					<div className={active ? style.active : style.notActive}></div>
					<p>{active ? 'Activo' : 'Inactivo'}</p>
				</div>
				<div className={style.buttons}>
					<IconButton
						icon={EditIcon}
						filled={false}
						kind='edit'
						onClick={() => setEditForm(user)}
					/>
					<IconButton
						icon={DeleteIcon}
						filled={false}
						kind='delete'
						onClick={() => setDeleteForm(user)}
					/>
				</div>
			</div>
		</div>
	);
};

export default UserCard;
