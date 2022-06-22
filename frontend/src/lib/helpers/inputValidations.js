const REGEX = {
	USERNAME: /^[a-z0-9]+$/,
	STARTS_WITH_NUMBER: /^[0-9]/,
	NAME: /^[a-záéíóú\s-]+$/i,
	STARTS_WITH_SPACE: /^[\s]/,
};

export const validateName = name => {
	if (name.length === 0) return undefined;

	if (REGEX.STARTS_WITH_SPACE.test(name))
		return 'No puede empezar con espacio';
	if (!REGEX.NAME.test(name)) return 'Sólo letras, guiones o espacios';
	if (name.includes('  ')) return 'No puede haber doble espacio';
	if (name.includes('--')) return 'No puede haber doble guión';

	const nameSplitted = name.split(' ');
	for (const word of nameSplitted) {
		if (word.startsWith('-') || word.endsWith('-'))
			return 'Uso de guiones incorrecto';
	}

	if (name.length < 3 || name.length > 25)
		return 'Longitud entre 3 y 25 carácteres';

	return false;
};

export const validateUsername = username => {
	if (username.length === 0) return undefined;

	if (REGEX.STARTS_WITH_SPACE.test(username))
		return 'No puede empezar con espacio';
	if (!REGEX.USERNAME.test(username)) return 'Sólo minúsculas y números';
	if (REGEX.STARTS_WITH_NUMBER.test(username))
		return 'Debe empezar por una letra';

	if (username.length < 6 || username.length > 15)
		return 'Longitud entre 6 y 15 carácteres';

	return false;
};
