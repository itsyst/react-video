import React from 'react';

const ListGroup = (props) => {
	const { items, textProperty, valueProperty, selectedItem, onItemSelect } =
		props;
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
