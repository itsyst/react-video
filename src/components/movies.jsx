import React, { Component } from 'react';
import Like from '../components/common/like';
import { getMovies } from '../services/fakeMovieService';

export default class Movies extends Component {
	state = {
		movies: getMovies()
	};

	handleDelete = (movie) => {
		const movies = this.state.movies.filter((m) => m._id !== movie._id);
		this.setState({ movies });
	};

	handleLiked = (movie) => {
		const movies = [...this.state.movies];
		const index = movies.indexOf(movie);
		movies[index] = { ...this.state.movies[index] };
		movies[index].liked = !movies[index].liked;
 		this.setState({ movies: movies });
	};

	render() {
		const { length: count } = this.state.movies;

		if (count === 0)
			return <p className="py-3">There is no movies in the database.</p>;

		return (
			<>
				<p>Showing {count} in the database.</p>
				<table className="table table-hover">
					<thead>
						<tr>
							<th scope="col">Title</th>
							<th scope="col">Genre</th>
							<th scope="col">Stock</th>
							<th scope="col">Rate</th>
							<th />
							<th />
						</tr>
					</thead>
					<tbody>
						{this.state.movies.map((movie) => (
							<tr key={movie._id}>
								<td>{movie.title}</td>
								<td>{movie.genre.name}</td>
								<td>{movie.numberInStock}</td>
								<td>{movie.dailyRentalRate}</td>
								<td>
									<Like
										liked={movie.liked}
										onLiked={() => this.handleLiked(movie)}
									/>
								</td>
								<td>
									<button
										onClick={() => this.handleDelete(movie)}
										className="btn btn-danger"
									>
										delete
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</>
		);
	}
}
