import SELECT_OPTIONS from '../constants/SelectOptions';
import USER_ROLES from '../constants/UserRoles';

const normalizeName = string =>
	string
		.toLowerCase()
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '');

const filterUsersByActive = (users, onlyActiveUsers) => {
	if (!onlyActiveUsers) return [...users];
	return users.filter(user => user.active);
};

const filterUsersBySearch = (users, query) => {
	if (query.length === 0) return users;

	return users.filter(user =>
		normalizeName(user.name).includes(normalizeName(query))
	);
};

const sortUsers = (users, sortBy) => {
	switch (sortBy) {
		case SELECT_OPTIONS.DEFAULT:
			return users;

		case SELECT_OPTIONS.ROLE:
			return users.sort((a, b) => {
				if (a.role === b.role) return 0;
				if (a.role === USER_ROLES.TEACHER) return -1;
				if (a.role === USER_ROLES.STUDENT && b.role === USER_ROLES.OTHER)
					return -1;
				return 1;
			});

		case SELECT_OPTIONS.ACTIVE:
			return users.sort(a => (a.active === true ? -1 : 1));

		case SELECT_OPTIONS.NAME: {
			return users.sort((a, b) => {
				if (normalizeName(a.name) > normalizeName(b.name)) return 1;
				if (normalizeName(a.name) < normalizeName(b.name)) return -1;
				return 0;
			});
		}

		default: {
			return users;
		}
	}
};

const usersToDisplay = (users, filters) => {
	if (!users) return [];
	if (!filters) return users;

	let finalUsers = filterUsersByActive(users, filters.onlyActiveUsers);
	finalUsers = sortUsers(finalUsers, filters.sortBy);
	finalUsers = filterUsersBySearch(finalUsers, filters.search);

	return finalUsers;
};

export default usersToDisplay;
