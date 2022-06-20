import { useState } from 'react';
import Button from '../Buttons/Button';
import InputSearch from '../Forms/InputSearch';
import style from './Filters.module.css';

const Filters = () => {
	const [name, setName] = useState({ value: '', error: false });

	const setInputName = name => {
		if (name.length === 0) return setName({ value: name, error: false });
		const error = name.length <= 6 || name.length > 25;
		setName({
			value: name,
			error,
		});
	};
	return (
		<div className={style.filters}>
			<InputSearch
				label='Nombre'
				placeholder='Buscar...'
				error={name.error}
				value={name.value}
				onChange={e => setInputName(e.target.value)}
			/>
			<div>
				<select name='' id=''>
					<option value='Por rol'>Por rol</option>
					<option value='Por acgtivos'>Por acgtivos</option>
				</select>
			</div>
			<div>
				<label htmlFor='sort'>
					<input type='checkbox' name='sort' id='sort' />
					<span>solo activos</span>
				</label>
			</div>
			<Button kind='create'>Añadir usuario nuevo</Button>
		</div>
	);
};

export default Filters;
