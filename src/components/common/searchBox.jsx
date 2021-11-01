import React from 'react';

const SearchBox = ({ value, onChange }) => {
	return (
		<div className="my-3">
			<input
				type="text"
				name="query"
				value={value}
				placeholder="Search..."
				onChange={(e) => onChange(e.currentTarget.value)}
				className="form-control my-3"
			/>
		</div>
	);
};

export default SearchBox;
