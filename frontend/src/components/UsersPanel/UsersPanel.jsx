import { useState } from 'react';
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
	const [panel, setPanel] = useState('filters');

	const setFilterPanel = () => setPanel('filters');
	const setCreatePanel = () => setPanel('create');

	return (
		<div className={style.usersPanel}>
			{panel !== 'filters' && (
				<button className={style.cancel} onClick={setFilterPanel}>
					X
				</button>
			)}
			{panel === 'filters' && (
				<Filters
					{...filters}
					setSortBy={setSortBy}
					setSearch={setSearch}
					setOnlyActiveUsers={setOnlyActiveUsers}
					setCreatePanel={setCreatePanel}
				/>
			)}
			{panel === 'create' && (
				<CreateUser
					reloadUsers={reloadUsers}
					setFilterPanel={setFilterPanel}
				/>
			)}
		</div>
	);
};

export default UsersPanel;
