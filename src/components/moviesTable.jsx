import React, { Component } from 'react';
import Like from './common/like';
import Table from './common/table';
import { Link } from 'react-router-dom';
import auth from '../services/authService';

export default class MoviesTable extends Component {
	columns = [
		{
			path: 'title',
			label: 'Title',
			content: (movie) => (
				<Link to={`/movies/${movie._id}`}>{movie.title}</Link>
			)
		},
		{ path: 'genre.name', label: 'Genre' },
		{ path: 'numberInStock', label: 'Stock' },
		{ path: 'dailyRentalRate', label: 'Rate' },
		{
			key: 'like',
			content: (movie) => (
				<Like
					liked={movie.liked}
					onLiked={() => this.props.onLike(movie)}
				/>
			)
		}
	];

	deleteColumn = {
		key: 'delete',
		content: (movie) => (
			<button
				onClick={() => this.props.onDelete(movie)}
				className="btn btn-danger"
			>
				delete
			</button>
		)
	};

	constructor() {
		super();
		const user = auth.getCurrentUser();
 		if (user && user.isAdmin) this.columns.push(this.deleteColumn);
	}

	render() {
		const { movies, onSort, sortColumn } = this.props;
		return (
			<Table
				sortColumn={sortColumn}
				onSort={onSort}
				columns={this.columns}
				data={movies}
			/>
		);
	}
}
