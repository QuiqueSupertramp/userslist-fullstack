import style from './InputText.module.css';

const InputText = ({ placeholder, error, ...props }) => {
	return (
		<div className={style.inputSearch}>
			<div className={style.inputContainer}>
				<input
					{...props}
					className={style.input}
					type='text'
					placeholder={placeholder}
				/>
			</div>
			{error && <span className={style.error}>* {error}</span>}
		</div>
	);
};

export default InputText;
