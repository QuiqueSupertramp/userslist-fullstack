import { useState } from 'react';
import IconButton from '../Buttons/IconButton';
import CrossIcon from '../Icons/CrossIcon';
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
				<IconButton
					icon={CrossIcon}
					className={style.cancel}
					onClick={setFilterPanel}
				/>
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
