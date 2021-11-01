import React from 'react';

const Input = ({ name, label, value, error, onChange, type = 'text' }) => {
	return (
		<div className="form-group">
			<label htmlFor={name}>{label}</label>
			<input
				id={name}
				value={value}
				name={name}
				type={type}
				onChange={onChange}
				className="form-control"
			/>
			{error && <div className="alert alert-danger p-1">{error}</div>}
		</div>
	);
};

export default Input;
