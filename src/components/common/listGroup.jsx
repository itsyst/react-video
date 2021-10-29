import React from 'react';

const ListGroup = ({ items, textProperty, valueProperty, selectedItem, onItemSelect }) => {
	return (
		<ul className="list-group">
			{items.map((item) => (
				<li
					key={item[textProperty]}
					className={
						item === selectedItem
							? 'list-group-item active  '
							: 'list-group-item '
					}
					onClick={() => onItemSelect(item)}
				>
					{item[valueProperty]}
				</li>
			))}
		</ul>
	);
};

ListGroup.defaultProps = {
	textProperty: '_id',
	valueProperty: 'name'
};

export default ListGroup;
