import Filters from './Filters';
import style from './usersPanel.module.css';

const UsersPanel = () => {
	return (
		<div className={style.usersPanel}>
			<button className={style.cancel}>X</button>
			<Filters />
		</div>
	);
};

export default UsersPanel;
