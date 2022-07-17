import { useReducer } from 'react';
import {
	filtersReducer,
	FILTERS_INITIAL_STATE,
} from '../reducers/FiltersReducer';

const useFilters = users => {
	const [filtersParams, dispatchFilters] = useReducer(
		filtersReducer,
		FILTERS_INITIAL_STATE
	);

	const filters = {
		search: filtersParams.search,
		sortBy: filtersParams.sortBy,
		onlyActiveUsers: filtersParams.onlyActiveUsers,
	};

	const pagination = {
		currentPage: filtersParams.currentPage,
		steps: filtersParams.steps,
	};

	return {
		filters,
		pagination,
		dispatchFilters,
	};
};

export default useFilters;
