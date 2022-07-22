import Button from '../Buttons/Button';
import MoonIcon from '../Icons/MoonIcon';
import SunIcon from '../Icons/SunIcon';
import style from './Header.module.css';

const Header = ({ theme, setTheme }) => {
	const Icon = theme === 'dark' ? SunIcon : MoonIcon;
	return (
		<header className={style.header}>
			<div className={style.headerContainer}>
				<div className={style.headerNav}>
					<h1 className={style.headerTitle}>Listado de usuarios</h1>
					<Button
						className={style.header__btn}
						onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
						<Icon className={style.header__icon} />
						{theme === 'dark' ? 'light' : 'dark'}
					</Button>
				</div>
			</div>
		</header>
	);
};

export default Header;
