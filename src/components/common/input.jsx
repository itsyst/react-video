import React from 'react';

const Input = ({ name, label, value, onChange }) => {
	return (
		<div className="form-group">
			<label htmlFor={name}>{label}</label>
			<input
				id={name}
				value={value}
				name={name}
				type="text"
				onChange={onChange}
                className="form-control"
  			/>
		</div>
	);
};

export default Input;
