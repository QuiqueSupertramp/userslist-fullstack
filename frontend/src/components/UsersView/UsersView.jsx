import GridView from '../Icons/GridView';
import ListView from '../Icons/ListView';
import style from './UsersView.module.css';

const UsersView = ({ setShowByRows }) => {
	return (
		<div className={style.usersView}>
			<GridView
				className={style.icon}
				onClick={() => setShowByRows(false)}
			/>
			<span>|</span>
			<ListView className={style.icon} onClick={() => setShowByRows(true)} />
		</div>
	);
};

export default UsersView;
