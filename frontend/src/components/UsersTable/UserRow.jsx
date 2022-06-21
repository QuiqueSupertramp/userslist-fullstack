import Button from '../Buttons/Button';
import style from './UserRow.module.css';

const UserRow = ({ user }) => {
	const { name, username, role, active, url } = user;
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
					<p>{role}</p>
				</div>
				<div className={style.buttons}>
					<Button kind='edit'>Editar</Button>
					<Button kind='delete'>Eliminar</Button>
				</div>
			</div>
		</div>
	);
};

export default UserRow;
