import ArrowDown from '../Icons/ArrowDown';
import style from './Select.module.css';

const Select = ({ ...props }) => {
	return (
		<div className={style.selectContainer}>
			<select {...props} className={style.select}></select>
			<ArrowDown className={style.arrow} />
		</div>
	);
};

export default Select;
