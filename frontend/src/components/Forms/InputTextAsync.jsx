import CheckCircle from '../Icons/CheckCircle';
import CrossCircle from '../Icons/CrossCircle';
import FindIcon from '../Icons/FindIcon';
import style from './InputTextAsync.module.css';

const InputTextAsync = ({ placeholder, error, isLoading, ...props }) => {
	const icon = getIcon(isLoading, error);
	return (
		<div className={style.inputSearch}>
			<div className={style.inputContainer}>
				<input
					{...props}
					className={style.input}
					type='text'
					placeholder={placeholder}
				/>
				{icon}
			</div>
			{error && <span className={style.error}>* {error}</span>}
		</div>
	);
};

const getIcon = (isLoading, error) => {
	if (isLoading) return <FindIcon className={style.findIcon} />;
	if (!isLoading && error) return <CrossCircle className={style.crossIcon} />;
	if (!isLoading && error === false)
		return <CheckCircle className={style.checkIcon} />;
};

export default InputTextAsync;
