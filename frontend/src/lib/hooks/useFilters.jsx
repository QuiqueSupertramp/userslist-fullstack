import { useState } from 'react';
import PAGINATION from '../constants/Pagination';

const initialState = {
	search: '',
	sortBy: 0,
	onlyActiveUsers: false,
	currentPage: PAGINATION.DEFAULT_PAGE,
	steps: PAGINATION.DEFAULT_STEPS,
};

const useFilters = users => {
	const [filtersParams, setFiltersParams] = useState(initialState);

	const setSearch = search => {
		setFiltersParams({
			...filtersParams,
			currentPage: PAGINATION.DEFAULT_PAGE,
			search,
		});
	};
	const setSortBy = sortBy => {
		setFiltersParams({
			...filtersParams,
			currentPage: PAGINATION.DEFAULT_PAGE,
			sortBy,
		});
	};
	const setOnlyActiveUsers = () =>
		setFiltersParams({
			...filtersParams,
			currentPage: PAGINATION.DEFAULT_PAGE,
			onlyActiveUsers: !filtersParams.onlyActiveUsers,
		});

	const setCurrentPage = currentPage =>
		setFiltersParams({ ...filtersParams, currentPage });

	const setSteps = steps =>
		setFiltersParams({
			...filtersParams,
			currentPage: PAGINATION.DEFAULT_PAGE,
			steps,
		});

	const resetFilters = () => setFiltersParams(initialState);

	const filters = {
		search: filtersParams.search,
		sortBy: filtersParams.sortBy,
		onlyActiveUsers: filtersParams.onlyActiveUsers,
	};
	const filterSetters = { setSearch, setSortBy, setOnlyActiveUsers };

	const pagination = {
		currentPage: filtersParams.currentPage,
		steps: filtersParams.steps,
	};

	const paginationSetters = { setCurrentPage, setSteps };

	return {
		filters,
		filterSetters,
		resetFilters,
		pagination,
		paginationSetters,
	};
};

export default useFilters;
