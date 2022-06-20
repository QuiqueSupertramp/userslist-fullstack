import style from './InputSearchAsync.module.css';

const InputSearchAsync = ({ placeholder, error, ...props }) => {
	return (
		<div className={style.inputSearch}>
			<div className={style.inputContainer}>
				<input
					{...props}
					className={style.input}
					type='text'
					placeholder={placeholder}
				/>
				<span>X</span>
			</div>
			{error && <span className={style.error}>* Error</span>}
		</div>
	);
};

export default InputSearchAsync;
