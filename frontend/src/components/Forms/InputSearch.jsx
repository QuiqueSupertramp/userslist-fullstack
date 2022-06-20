import style from './InputSearch.module.css';

const InputSearch = ({ placeholder, error, ...props }) => {
	return (
		<div className={style.inputSearch}>
			<input
				{...props}
				className={style.input}
				type='text'
				placeholder={placeholder}
			/>
			{error && <span className={style.error}>* Error</span>}
		</div>
	);
};

export default InputSearch;
