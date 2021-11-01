import React from 'react';

const Select = ({ name, label, options, error, ...rest }) => {
	return (
		<div className="form-group">
			<label htmlFor={name}>{label}</label>
			<select
				name={name}
				id={name}
				{...rest}
				className="form-control form-control mb-3"
			>
				<option value="" />
				{options.map((option) => (
					<option key={option._id} value={option._id}>
						{option.name}
					</option>
				))}
			</select>
		</div>
	);
};

export default Select;
