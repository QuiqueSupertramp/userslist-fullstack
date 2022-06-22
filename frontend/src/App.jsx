import { useState } from 'react';
import Header from './components/Header/Header';
import UsersPanel from './components/UsersPanel/UsersPanel';
import UsersTable from './components/UsersTable/UsersTable';

import usersToDisplay from './lib/helpers/usersToDisplay';
import useFilters from './lib/hooks/useFilters';
import useUsers from './lib/hooks/useUsers';

function App() {
	const [theme, setTheme] = useState('dark');

	const { users, isLoading, error, reloadUsers } = useUsers();

	const { filters, setSearch, setSortBy, setOnlyActiveUsers } = useFilters();

	const filteredUsers = usersToDisplay(users, filters);

	return (
		<div className={`${theme} app`}>
			<Header theme={theme} setTheme={setTheme} />
			<main>
				<UsersTable
					users={filteredUsers}
					isLoading={isLoading}
					error={error}
				/>
				<UsersPanel
					filters={filters}
					setSortBy={setSortBy}
					setSearch={setSearch}
					setOnlyActiveUsers={setOnlyActiveUsers}
					reloadUsers={reloadUsers}
				/>
			</main>
		</div>
	);
}

export default App;
