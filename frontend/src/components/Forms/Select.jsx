import ArrowDown from '../Icons/ArrowDown';
import style from './Select.module.css';

const Select = ({ className = '', ...props }) => {
	return (
		<div className={style.selectContainer}>
			<select {...props} className={`${style.select} ${className}`}></select>
			<ArrowDown className={style.arrow} />
		</div>
	);
};

export default Select;
