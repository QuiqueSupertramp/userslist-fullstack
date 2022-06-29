import UserCard from './UserCard';
import UserRow from './UserRow';
import style from './UsersTable.module.css';

const UsersTable = ({ users, usersIsLoading, usersError, showByRows }) => {
	if (usersError) return <p className={style.usersTable}>Error</p>;
	if (usersIsLoading) return <p className={style.usersTable}>Cargando....</p>;
	if (users.length === 0)
		return <p className={style.usersTable}>No hay usuarios</p>;

	const UsersDisplayFormat = showByRows ? UserRow : UserCard;

	return (
		<div className={style.usersTable}>
			{users.map(user => (
				<UsersDisplayFormat key={user.url} user={user} />
			))}
		</div>
	);
};

export default UsersTable;
