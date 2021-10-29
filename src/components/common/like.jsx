import React from 'react';
import PropTypes from 'prop-types';

const Like = ({ liked, onLiked }) => {
	let classes = 'fa fa-heart';
	if (!liked) classes += '-o';
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
