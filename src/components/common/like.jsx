import React from 'react';
import PropTypes from 'prop-types';

const Like = (props) => {
	const {onLiked} = props
	let classes = 'fa fa-heart';
	if (!props.liked) classes += '-o';
	return (
		<i
			onClick={onLiked}
			className={classes}
			style={{ cursor: 'pointer' }}
			aria-hidden="true"
		></i>
	);
};

Like.propTypes = {
	onLiked: PropTypes.func.isRequired
};

export default Like;
