import { useEffect, useState } from 'react';
import { fetchUsers } from '../services/api';

const initialState = {
	users: [],
	isLoading: true,
	error: false,
};

const useUsers = () => {
	const [usersData, setUsersData] = useState(initialState);

	const reloadUsers = () => setUsersData(initialState);

	const setUsers = users =>
		setUsersData({ users, isLoading: false, error: false });

	const setError = error =>
		setUsersData({ users: [], isLoading: false, error });

	useEffect(() => {
		if (usersData.isLoading) {
			const controller = new AbortController();
			const signal = controller.signal;
			loadUsers(setUsers, setError, signal);
			return () => controller.abort();
		}
	}, [usersData.isLoading]);

	return { ...usersData, reloadUsers };
};

const loadUsers = async (setUsers, setError, signal) => {
	const { users, error, aborted } = await fetchUsers(signal);
	if (aborted) return;
	error ? setError(error) : setUsers(users.users);
};

export default useUsers;