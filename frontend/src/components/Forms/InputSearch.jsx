import SearchIcon from '../Icons/SearchIcon';
import style from './InputSearch.module.css';

const InputSearch = ({ className = '', ...props }) => {
	return (
		<div className={style.inputContainer}>
			<SearchIcon className={style.icon} />
			<input {...props} className={style.input} type='text' />
		</div>
	);
};

export default InputSearch;
