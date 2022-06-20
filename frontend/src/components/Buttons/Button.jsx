import style from './Button.module.css';

const Button = ({ children, kind = 'edit', className = '', ...props }) => {
	return (
		<button
			{...props}
			className={`${style.button} ${KIND_CLASSNAME[kind]} ${className}`}>
			{children}
		</button>
	);
};

const KIND_CLASSNAME = {
	create: style.create,
	edit: style.edit,
	delete: style.delete,
};

export default Button;
