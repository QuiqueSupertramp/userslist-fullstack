import Button from '../Buttons/Button';
import style from './UserRow.module.css';

const UserRow = () => {
	const isActive = false;
	return (
		<div className={style.card}>
			<div className={style.displayName}>
				<p>Nombre</p>
				<p className={style.username}>@usuario</p>
			</div>
			<div className={style.info}>
				<div className={style.activeContainer}>
					<div className={isActive ? style.active : style.notActive}></div>
					<p>{isActive ? 'Activo' : 'Inactivo'}</p>
				</div>
				<div>
					<p>Student</p>
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
