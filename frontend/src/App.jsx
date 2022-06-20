import { useState } from 'react';
import Header from './components/Header/Header';
import UsersPanel from './components/UsersPanel/UsersPanel';
import UsersTable from './components/UsersTable/UsersTable';

function App() {
	const [theme, setTheme] = useState('dark');

	return (
		<div className={`${theme} app`}>
			<Header theme={theme} setTheme={setTheme} />
			<main>
				<UsersTable />
				<UsersPanel />
			</main>
		</div>
	);
}

export default App;
