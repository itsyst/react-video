import React, { Component } from 'react';
import TableHeader from './common/tableHeader';
import TableBody from './common/tableBody';
import Like from './common/like';

export default class MoviesTable extends Component {
	columns = [
		{ path: 'title', label: 'Title' },
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
		},
		{
			key: 'delete',
			content: (movie) => (
				<button
					onClick={() => this.props.onDelete(movie)}
					className="btn btn-danger"
				>
					delete
				</button>
			)
		}
	];
	render() {
		const { movies, onDelete, onLike, onSort, sortColumn } = this.props;
		return (
			<table className="table table-hover">
				<TableHeader
					columns={this.columns}
					sortColumn={sortColumn}
					onSort={onSort}
				/>
				<TableBody
					data={movies}
					columns={this.columns}
					onDelete={onDelete}
					onLike={onLike}
				/>
			</table>
		);
	}
}
