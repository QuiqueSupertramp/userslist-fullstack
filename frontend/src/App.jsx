import { useState } from 'react';
import Header from './components/Header/Header';
import Pagination from './components/Pagination/Pagination';
import UsersFormContainer from './components/UsersFormContainer/UsersFormContainer';
import UsersTable from './components/UsersTable/UsersTable';
import UsersView from './components/UsersView/UsersView';
import { FILTERS_ACTIONS } from './lib/constants/FiltersActions';
import { UserFormProvider } from './lib/contexts/UserFormsContext';
import usersToDisplay from './lib/helpers/usersToDisplay';
import useFilters from './lib/hooks/useFilters';
import useUsers from './lib/hooks/useUsers';

function App() {
	const [theme, setTheme] = useState('dark');
	const [showByRows, setShowByRows] = useState(true);

	const { users, usersIsLoading, usersError, reloadUsers } = useUsers();

	const { filters, pagination, dispatchFilters } = useFilters(users);

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
					resetFilters={() =>
						dispatchFilters({ type: FILTERS_ACTIONS.RESET })
					}>
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
							setSteps={steps =>
								dispatchFilters({
									type: FILTERS_ACTIONS.STEPS,
									value: steps,
								})
							}
							setCurrentPage={newCurrentPage =>
								dispatchFilters({
									type: FILTERS_ACTIONS.CURRENT_PAGE,
									value: newCurrentPage,
								})
							}
						/>
					</div>
					<UsersFormContainer
						filters={filters}
						dispatchFilters={dispatchFilters}
					/>
				</UserFormProvider>
			</main>
		</div>
	);
}

export default App;
