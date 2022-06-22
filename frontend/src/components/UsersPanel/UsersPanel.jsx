import CreateUser from './CreateUser';
import Filters from './Filters';
import style from './usersPanel.module.css';

const UsersPanel = ({
	filters,
	setSearch,
	setSortBy,
	setOnlyActiveUsers,
	reloadUsers,
}) => {
	return (
		<div className={style.usersPanel}>
			<button className={style.cancel}>X</button>
			{/* <Filters
				{...filters}
				setSortBy={setSortBy}
				setSearch={setSearch}
				setOnlyActiveUsers={setOnlyActiveUsers}
			/> */}
			<CreateUser reloadUsers={reloadUsers} />
		</div>
	);
};

export default UsersPanel;
