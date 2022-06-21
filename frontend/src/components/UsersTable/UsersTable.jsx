import UserRow from './UserRow';
import style from './UsersTable.module.css';

const UsersTable = ({ users, isLoading, error }) => {
	if (error) return <p className={style.usersTable}>Error</p>;
	if (isLoading) return <p className={style.usersTable}>Cargando....</p>;
	if (users.length === 0)
		return <p className={style.usersTable}>No hay usuarios</p>;

	return (
		<div className={style.usersTable}>
			{users.map(user => (
				<UserRow key={user.url} user={user} />
			))}
		</div>
	);
};

export default UsersTable;
