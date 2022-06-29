// Functions
const URL_API = 'https://userslistpractice.herokuapp.com/users';

const fetchAPI = async ({ url, method, signal, body, username }) => {
	try {
		const res = await fetchAction({ url, method, signal, body, username });
		if (!res.ok) throw new Error();
		const data = await res.json();
		return { data, error: false, aborted: false };
	} catch (error) {
		if (error.name === 'AbortError')
			return {
				data: null,
				error: false,
				aborted: 'La petición ha sido cancelada',
			};
		return {
			data: null,
			error,
			aborted: false,
		};
	}
};

const fetchAction = async ({
	url = URL_API,
	method = 'GET',
	signal,
	body,
	username,
}) => {
	if (username) {
		url = new URL(url);
		url.searchParams.append('username', username);
	}

	return await fetch(url, {
		method,
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(body),
		signal,
	});
};

export default fetchAPI;
