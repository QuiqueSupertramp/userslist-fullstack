import { useReducer } from 'react';
import { FILTERS_ACTIONS } from '../constants/FiltersActions';
import PAGINATION from '../constants/Pagination';

const INITIAL_STATE = {
	search: '',
	sortBy: 0,
	onlyActiveUsers: false,
	currentPage: PAGINATION.DEFAULT_PAGE,
	steps: PAGINATION.DEFAULT_STEPS,
};

const filtersReducer = (state, action) => {
	switch (action.type) {
		case FILTERS_ACTIONS.SEARCH:
			return {
				...state,
				currentPage: PAGINATION.DEFAULT_PAGE,
				search: action.value,
			};
		case FILTERS_ACTIONS.SORT_BY:
			return {
				...state,
				currentPage: PAGINATION.DEFAULT_PAGE,
				sortBy: action.value,
			};
		case FILTERS_ACTIONS.ONLY_ACTIVES:
			return {
				...state,
				currentPage: PAGINATION.DEFAULT_PAGE,
				onlyActiveUsers: !state.onlyActiveUsers,
			};
		case FILTERS_ACTIONS.CURRENT_PAGE:
			return {
				...state,
				currentPage: action.value,
			};
		case FILTERS_ACTIONS.STEPS:
			return {
				...state,
				currentPage: PAGINATION.DEFAULT_PAGE,
				steps: action.value,
			};
		case FILTERS_ACTIONS.RESET:
			return { ...INITIAL_STATE };

		default:
			throw new Error('Invalid action');
	}
};

const useFilters = users => {
	const [filtersParams, dispatchFilters] = useReducer(
		filtersReducer,
		INITIAL_STATE
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
