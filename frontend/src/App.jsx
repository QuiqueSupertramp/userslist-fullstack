import { useState } from 'react';
import Header from './components/Header/Header';
import Pagination from './components/Pagination/Pagination';
import UsersFormContainer from './components/UsersFormContainer/UsersFormContainer';
import UsersTable from './components/UsersTable/UsersTable';
import UsersView from './components/UsersView/UsersView';
import { UserFormProvider } from './lib/contexts/UserFormsContext';
import usersToDisplay from './lib/helpers/usersToDisplay';
import useFilters from './lib/hooks/useFilters';
import useUsers from './lib/hooks/useUsers';

function App() {
	const [theme, setTheme] = useState('dark');
	const [showByRows, setShowByRows] = useState(true);

	const { users, usersIsLoading, usersError, reloadUsers } = useUsers();
	console.log('usersIsLoading', usersIsLoading);

	const {
		filters,
		filterSetters,
		resetFilters,
		pagination,
		paginationSetters,
	} = useFilters(users);

	const { paginatedUsers, totalPages } = usersToDisplay(
		users,
		filters,
		pagination
	);

	return (
		<div className={`${theme} app`}>
			<Header theme={theme} setTheme={setTheme} />
			<main>
				<UserFormProvider
					reloadUsers={reloadUsers}
					resetFilters={resetFilters}>
					<div className='usersList'>
						<UsersView
							showByRows={showByRows}
							setShowByRows={setShowByRows}
						/>
						<UsersTable
							users={paginatedUsers}
							usersIsLoading={usersIsLoading}
							usersError={usersError}
							showByRows={showByRows}
						/>
						<Pagination
							totalPages={totalPages}
							pagination={pagination}
							paginationSetters={paginationSetters}
						/>
					</div>
					<UsersFormContainer
						filters={filters}
						filterSetters={filterSetters}
					/>
				</UserFormProvider>
			</main>
		</div>
	);
}

export default App;
