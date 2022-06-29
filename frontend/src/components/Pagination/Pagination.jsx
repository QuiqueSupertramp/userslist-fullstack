import PAGINATION from '@/lib/constants/Pagination';
import IconButton from '../Buttons/IconButton';
import Select from '../Forms/Select';
import NextArrow from '../Icons/NextArrow';
import PrevArrow from '../Icons/PrevArrow';
import style from './Pagination.module.css';

const Pagination = ({ totalPages, pagination, paginationSetters }) => {
	const { currentPage, steps } = pagination;
	const { setCurrentPage, setSteps } = paginationSetters;

	return (
		<div className={style.pagination}>
			<Select
				value={steps}
				onChange={e => setSteps(e.target.value)}
				className={style.select}>
				<option value={PAGINATION.STEPS[0]}>{PAGINATION.STEPS[0]}</option>
				<option value={PAGINATION.STEPS[1]}>{PAGINATION.STEPS[1]}</option>
				<option value={PAGINATION.STEPS[2]}>{PAGINATION.STEPS[2]}</option>
			</Select>
			<div className={style.currentPage}>
				<IconButton
					icon={PrevArrow}
					disabled={currentPage === 1}
					onClick={() => setCurrentPage(currentPage - 1)}
				/>
				<span>
					Página {currentPage} de {totalPages}
				</span>
				<IconButton
					icon={NextArrow}
					disabled={currentPage === totalPages}
					onClick={() => setCurrentPage(currentPage + 1)}
				/>
			</div>
		</div>
	);
};

export default Pagination;
