import { useState } from 'react';
import Header from './components/Header/Header';
import UsersPanel from './components/UsersPanel/UsersPanel';
import UsersTable from './components/UsersTable/UsersTable';

import usersToDisplay from './lib/helpers/usersToDisplay';
import useFilters from './lib/hooks/useFilters';
import useForms from './lib/hooks/useForms';
import useUsers from './lib/hooks/useUsers';

function App() {
	const [theme, setTheme] = useState('dark');

	const { users, isLoading, error, reloadUsers } = useUsers();

	const { filters, filterSetters } = useFilters();

	const { form, setFilterForm, setCreateForm, setEditForm, setDeleteForm } =
		useForms();

	const filteredUsers = usersToDisplay(users, filters);

	return (
		<div className={`${theme} app`}>
			<Header theme={theme} setTheme={setTheme} />
			<main>
				<UsersTable
					users={filteredUsers}
					isLoading={isLoading}
					error={error}
					setEditForm={setEditForm}
					setDeleteForm={setDeleteForm}
				/>
				<UsersPanel
					filters={filters}
					filterSetters={filterSetters}
					form={form}
					setFilterForm={setFilterForm}
					setCreateForm={setCreateForm}
					reloadUsers={reloadUsers}
				/>
			</main>
		</div>
	);
}

export default App;
