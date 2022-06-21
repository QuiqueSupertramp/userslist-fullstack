export const fetchUsers = async signal => {
	try {
		const res = await fetch('https://userslistpractice.herokuapp.com/users', {
			signal,
		});
		if (!res.ok) throw new Error();
		const users = await res.json();
		return { users, error: false, aborted: false };
	} catch (error) {
		if (error.name === 'AbortError')
			return { users: null, error: false, aborted: true };
		return { users: null, error: true, aborted: false };
	}
};
