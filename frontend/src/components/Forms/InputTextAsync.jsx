import CheckCircle from '../Icons/CheckCircle';
import style from './InputTextAsync.module.css';

const InputTextAsync = ({ placeholder, error, ...props }) => {
	return (
		<div className={style.inputSearch}>
			<div className={style.inputContainer}>
				<input
					{...props}
					className={style.input}
					type='text'
					placeholder={placeholder}
				/>
				<CheckCircle className={style.checkIcon} />
			</div>
			{error && <span className={style.error}>* Error</span>}
		</div>
	);
};

export default InputTextAsync;
