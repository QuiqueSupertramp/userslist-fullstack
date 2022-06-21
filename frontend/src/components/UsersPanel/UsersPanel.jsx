import Filters from './Filters';
import style from './usersPanel.module.css';

const UsersPanel = ({ filters, setSearch, setSortBy, setOnlyActiveUsers }) => {
	return (
		<div className={style.usersPanel}>
			<button className={style.cancel}>X</button>
			<Filters
				{...filters}
				setSortBy={setSortBy}
				setSearch={setSearch}
				setOnlyActiveUsers={setOnlyActiveUsers}
			/>
		</div>
	);
};

export default UsersPanel;
