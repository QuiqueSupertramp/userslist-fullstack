import UserRow from './UserRow';
import style from './UsersTable.module.css';

const UsersTable = () => {
	return (
		<div className={style.usersTable}>
			<UserRow />
			<UserRow />
			<UserRow />
			<UserRow />
			<UserRow />
			<UserRow />
		</div>
	);
};

export default UsersTable;
