const Header = ({ theme, setTheme }) => {
	return (
		<header className='header'>
			<div className='headerContainer'>
				<div className='headerNav'>
					<h1 className='title'>Listado de usuarios</h1>
					<button
						onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
						{theme === 'dark' ? 'light' : 'dark'}
					</button>
				</div>
			</div>
		</header>
	);
};

export default Header;
