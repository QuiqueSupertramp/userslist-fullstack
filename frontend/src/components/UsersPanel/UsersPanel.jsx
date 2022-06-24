import { PANELS } from '@/lib/constants/Panels';
import IconButton from '../Buttons/IconButton';
import CrossIcon from '../Icons/CrossIcon';
import CreateUser from './CreateUser';
import DeleteUser from './DeleteUser';
import EditUser from './EditUser';
import Filters from './Filters';
import style from './usersPanel.module.css';

const UsersPanel = ({
	filters,
	filterSetters,
	reloadUsers,
	form,
	setFilterForm,
	setCreateForm,
}) => {
	const { panel, currentUser } = form;
	const { setSearch, setSortBy, setOnlyActiveUsers } = filterSetters;
	const onSuccess = () => {
		reloadUsers();
		setFilterForm();
	};
	return (
		<div className={style.usersPanel}>
			{panel !== PANELS.FILTERS && (
				<IconButton
					icon={CrossIcon}
					className={style.cancel}
					onClick={setFilterForm}
				/>
			)}
			{panel === PANELS.FILTERS && (
				<Filters
					{...filters}
					setSortBy={setSortBy}
					setSearch={setSearch}
					setOnlyActiveUsers={setOnlyActiveUsers}
					setCreateForm={setCreateForm}
				/>
			)}
			{panel === PANELS.CREATE && <CreateUser onSuccess={onSuccess} />}
			{panel === PANELS.EDIT && (
				<EditUser currentUser={currentUser} onSuccess={onSuccess} />
			)}
			{panel === PANELS.DELETE && (
				<DeleteUser currentUser={currentUser} onSuccess={onSuccess} />
			)}
		</div>
	);
};

export default UsersPanel;
