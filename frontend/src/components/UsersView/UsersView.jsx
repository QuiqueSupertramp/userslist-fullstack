import IconButton from '../Buttons/IconButton';
import GridView from '../Icons/GridView';
import ListView from '../Icons/ListView';
import style from './UsersView.module.css';

const UsersView = ({ showByRows, setShowByRows }) => {
	return (
		<div className={style.usersView}>
			<IconButton
				icon={GridView}
				className={style.icon}
				onClick={() => setShowByRows(false)}
				filled={false}
				disabled={!showByRows}
			/>
			<span>|</span>
			<IconButton
				icon={ListView}
				className={style.icon}
				onClick={() => setShowByRows(true)}
				filled={false}
				disabled={showByRows}
			/>
		</div>
	);
};

export default UsersView;
