import React, { Component } from 'react';

export default class like extends Component {
	render() {
		let classes = 'fa fa-heart';
		if (!this.props.liked) classes += '-o';
		return (
			<i
				onClick={this.props.onLiked}
				className={classes}
				style={{ cursor: 'pointer' }}
				aria-hidden="true"
			></i>
		);
	}
}
