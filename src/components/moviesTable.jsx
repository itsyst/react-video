import React, { Component } from 'react';
import Like from './common/like';
import Table from './common/table';
import { Link } from 'react-router-dom';
import auth from '../services/authService';

export default class MoviesTable extends Component {
	state = {};

	componentDidMount() {
		const user = auth.getCurrentUser();
		this.setState({ user });
	}

	columns = [
		{
			path: 'title',
			label: 'Title',
			content: (movie) =>
				this.state.user ? (
					<Link to={`/movies/${movie._id}`}>{movie.title}</Link>
				) : (
					<p>{movie.title}</p>
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
		},
		{
			key: 'delete',
			content: (movie) =>
				this.state.user && (
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
