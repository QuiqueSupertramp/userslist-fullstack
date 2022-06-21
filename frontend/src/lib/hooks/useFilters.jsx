import { useState } from 'react';

const useFilters = () => {
	const [filters, setFilters] = useState({
		search: '',
		sortBy: 0,
		onlyActiveUsers: false,
	});

	const setSearch = search => {
		setFilters({ ...filters, search });
	};
	const setSortBy = sortBy => {
		setFilters({ ...filters, sortBy });
	};
	const setOnlyActiveUsers = () =>
		setFilters({
			...filters,
			onlyActiveUsers: !filters.onlyActiveUsers,
		});

	return { filters, setSearch, setSortBy, setOnlyActiveUsers };
};

export default useFilters;
