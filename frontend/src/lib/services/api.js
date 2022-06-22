import fetchAPI from '../helpers/fetchAction';

// fetchAPI possible props => { url = URL_API, method = 'GET, signal, body }
// fetchAPI structure res => { data, error, aborted }

export const getUsers = async signal => await fetchAPI({ signal });

export const getUserById = async url => await fetchAPI({ url });

export const createUser = async newUser =>
	await fetchAPI({ method: 'POST', body: newUser });

export const deleteUser = async url =>
	await fetchAPI({ url, method: 'DELETE' });

export const updateUser = async (url, userChanges) =>
	await fetchAPI({ url, body: userChanges, method: 'PATCH' });
