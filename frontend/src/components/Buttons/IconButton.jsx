import style from './IconButton.module.css';

const IconButton = ({ icon: Icon, className, ...props }) => {
	return (
		<button {...props} className={`${style.button} ${className}`}>
			<Icon className={style.icon} />
		</button>
	);
};

export default IconButton;
