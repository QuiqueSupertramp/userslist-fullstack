import SELECT_OPTIONS from '@/lib/constants/SelectOptions';
import Button from '../Buttons/Button';
import InputCheckbox from '../Forms/InputCheckbox';
import InputSearch from '../Forms/InputSearch';
import Select from '../Forms/Select';
import style from './Filters.module.css';

const Filters = ({
	search,
	sortBy,
	onlyActiveUsers,
	setSearch,
	setSortBy,
	setOnlyActiveUsers,
	setCreatePanel,
}) => {
	return (
		<div className={style.filters}>
			<InputSearch
				placeholder='Buscar...'
				value={search}
				onChange={e => setSearch(e.target.value)}
			/>
			<Select value={sortBy} onChange={e => setSortBy(e.target.value)}>
				<option value={SELECT_OPTIONS.DEFAULT}>Por defecto</option>
				<option value={SELECT_OPTIONS.ROLE}>Por rol</option>
				<option value={SELECT_OPTIONS.NAME}>Por orden alfabético</option>
				{!onlyActiveUsers && (
					<option value={SELECT_OPTIONS.ACTIVE}>Por activos</option>
				)}
			</Select>
			<InputCheckbox
				label='Mostrar solo activos'
				checked={onlyActiveUsers}
				onChange={setOnlyActiveUsers}
			/>
			<Button
				kind='create'
				onClick={setCreatePanel}
				className={style.button}>
				Añadir usuario nuevo
			</Button>
		</div>
	);
};

export default Filters;
