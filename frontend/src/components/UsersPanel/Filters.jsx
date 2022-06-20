import { useState } from 'react';
import Button from '../Buttons/Button';
import InputCheckbox from '../Forms/InputCheckbox';
import InputSearch from '../Forms/InputSearch';
import Select from '../Forms/Select';
import style from './Filters.module.css';

const Filters = () => {
	const [filters, setFilters] = useState({
		search: '',
		sortBy: null,
		onlyActives: false,
	});

	const setSearch = search => {
		setFilters({ ...filters, search });
	};
	const setSortBy = sortBy => {
		setFilters({ ...filters, sortBy });
	};
	const setOnlyActives = () =>
		setFilters({ ...filters, onlyActives: !filters.onlyActives });

	return (
		<div className={style.filters}>
			<InputSearch
				placeholder='Buscar...'
				value={filters.search}
				onChange={e => setSearch(e.target.value)}
			/>
			<Select
				value={filters.sortBy}
				onChange={e => setSortBy(e.target.value)}>
				<option value='ABC'>ABC</option>
				<option value='cde'>sdf</option>
				<option value='fgh'>fsdfsdf</option>
				{/* <option value={SELECT_OPTIONS.DEFAULT}>Por defecto</option>
               <option value={SELECT_OPTIONS.ROLE}>Por rol</option>
               <option value={SELECT_OPTIONS.NAME}>Por orden alfabético</option>
               {!onlyActiveUsers && <option value={SELECT_OPTIONS.ACTIVE}>Por activos</option>} */}
			</Select>
			<InputCheckbox
				label='Mostrar solo activos'
				checked={filters.onlyActives}
				onChange={setOnlyActives}
			/>
			<Button kind='create'>Añadir usuario nuevo</Button>
		</div>
	);
};

export default Filters;
