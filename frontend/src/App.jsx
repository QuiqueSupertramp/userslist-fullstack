import { useState } from 'react';
import Header from './components/Header/Header';
import UsersPanel from './components/UsersPanel/UsersPanel';
import UsersTable from './components/UsersTable/UsersTable';
import useUsers from './lib/hooks/useUsers';

function App() {
	const [theme, setTheme] = useState('dark');

	const { users, isLoading, error, reloadUsers } = useUsers();

	// const { users, isLoading, error } = usersData;

	return (
		<div className={`${theme} app`}>
			<Header theme={theme} setTheme={setTheme} />
			<main>
				<UsersTable users={users} isLoading={isLoading} error={error} />
				<UsersPanel />
			</main>
		</div>
	);
}

export default App;
