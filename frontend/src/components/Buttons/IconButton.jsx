import style from './IconButton.module.css';

const IconButton = ({
	icon: Icon,
	className,
	filled = true,
	kind = '',
	...props
}) => {
	const KIND_CLASSNAME = {
		edit: style.edit,
		delete: style.delete,
	};

	const isFilled = filled ? style.filled : null;

	return (
		<button
			{...props}
			className={`${style.button} ${isFilled} ${KIND_CLASSNAME[kind]} ${className}`}>
			<Icon className={style.icon} />
		</button>
	);
};

export default IconButton;
