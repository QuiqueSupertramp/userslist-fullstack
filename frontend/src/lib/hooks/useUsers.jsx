import { useEffect, useState } from 'react';
import { getUsers } from '../services/api';

const initialState = {
	users: [],
	usersIsLoading: true,
	usersError: false,
};

const useUsers = () => {
	const [usersData, setUsersData] = useState(initialState);

	const reloadUsers = () => setUsersData(initialState);

	const setUsers = users =>
		setUsersData({ users, usersIsLoading: false, usersError: false });

	const setError = error =>
		setUsersData({ users: [], usersIsLoading: false, usersError: error });

	useEffect(() => {
		if (usersData.usersIsLoading) {
			const controller = new AbortController();
			const signal = controller.signal;
			loadUsers(setUsers, setError, signal);
			return () => controller.abort();
		}
	}, [usersData.usersIsLoading]);

	return { ...usersData, reloadUsers };
};

const loadUsers = async (setUsers, setError, signal) => {
	const { data, error, aborted } = await getUsers(signal);
	if (aborted) return;

	error ? setError(error) : setUsers(data.users);
};

export default useUsers;
