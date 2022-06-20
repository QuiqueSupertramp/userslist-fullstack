import style from './InputCheckbox.module.css';
import CheckIcon from '../Icons/CheckIcon';

const InputCheckbox = ({ label = '', ...props }) => {
	return (
		<label className={style.checkboxContainer}>
			<div className={style.checkbox}>
				<input {...props} type='checkbox' className={style.input} />
				<CheckIcon className={style.checkIcon} />
			</div>
			<span className={style.label}>{label}</span>
		</label>
	);
};

export default InputCheckbox;
