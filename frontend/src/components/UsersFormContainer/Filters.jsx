import { FILTERS_ACTIONS } from '@/lib/constants/FiltersActions';
import SELECT_OPTIONS from '@/lib/constants/SelectOptions';
import { USER_FORMS } from '@/lib/constants/UserForms';
import UserFormsContext from '@/lib/contexts/UserFormsContext';
import { useContext } from 'react';
import Button from '../Buttons/Button';
import InputCheckbox from '../Forms/InputCheckbox';
import InputSearch from '../Forms/InputSearch';
import Select from '../Forms/Select';
import style from './Filters.module.css';

const Filters = ({ search, sortBy, onlyActiveUsers, dispatchFilters }) => {
	const { setCreateForm, currentForm } = useContext(UserFormsContext);
	if (currentForm !== USER_FORMS.FILTERS) return null;

	return (
		<div className={style.filters}>
			<InputSearch
				placeholder='Buscar...'
				value={search}
				onChange={e =>
					dispatchFilters({
						type: FILTERS_ACTIONS.SEARCH,
						value: e.target.value,
					})
				}
			/>
			<Select
				selectClass={style.select}
				value={sortBy}
				onChange={e =>
					dispatchFilters({
						type: FILTERS_ACTIONS.SORT_BY,
						value: e.target.value,
					})
				}>
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
				onChange={() =>
					dispatchFilters({ type: FILTERS_ACTIONS.ONLY_ACTIVES })
				}
			/>
			<Button kind='create' onClick={setCreateForm} className={style.button}>
				Añadir usuario nuevo
			</Button>
		</div>
	);
};

export default Filters;
