import ArrowDown from '../Icons/ArrowDown';
import style from './Select.module.css';

const Select = ({ selectClass = '', iconClass = '', ...props }) => {
	return (
		<div className={style.selectContainer}>
			<select
				{...props}
				className={`${style.select} ${selectClass}`}></select>
			<ArrowDown className={`${style.arrow} ${iconClass}`} />
		</div>
	);
};

export default Select;
