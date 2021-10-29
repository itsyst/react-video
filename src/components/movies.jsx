import React, { Component } from 'react';
import Like from '../components/common/like';
import ListGroup from './common/listGroup';
import Pagination from './common/pagination';
import { getGenres } from '../services/fakeGenreService';
import { getMovies } from '../services/fakeMovieService';
import { paginate } from '../utils/paginate';

export default class Movies extends Component {
	state = {
		movies: [],
		genres: [],
		currentPage: 1,
		pageSize: 4
	};

	componentDidMount = () => {
		const genres = [{ name: 'All Genres' }, ...getGenres()];
		this.setState({ movies: getMovies(), genres: genres });
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

	handlePagination = (page) => {
		this.setState({ currentPage: page });
	};

	handleGenreSelect = (genre) => {
		this.setState({ selectedGenre: genre, currentPage: 1 });
	};

	render() {
		const { length: count } = this.state.movies;
		const {
			pageSize,
			currentPage,
			movies: allMovies,
			genres,
			selectedGenre
		} = this.state;

		if (count === 0)
			return <p className="py-3">There is no movies in the database.</p>;

		const filtered =
			selectedGenre && selectedGenre._id
				? allMovies.filter((m) => m.genre._id === selectedGenre._id)
				: allMovies;

		const movies = paginate(filtered, currentPage, pageSize);

		return (
			<div className="row">
				<div className="col-2">
					<ListGroup
						items={genres}
						selectedItem={selectedGenre}
						onItemSelect={this.handleGenreSelect}
						// textProperty="_id" // these two properties are defined in listGroup comp
						// valueProperty="name"
					/>
				</div>
				<div className="col">
					<p>Showing {filtered.length} movies in the database.</p>
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
							{movies.map((movie) => (
								<tr key={movie._id}>
									<td>{movie.title}</td>
									<td>{movie.genre.name}</td>
									<td>{movie.numberInStock}</td>
									<td>{movie.dailyRentalRate}</td>
									<td>
										<Like
											liked={movie.liked}
											onLiked={() =>
												this.handleLiked(movie)
											}
										/>
									</td>
									<td>
										<button
											onClick={() =>
												this.handleDelete(movie)
											}
											className="btn btn-danger"
										>
											delete
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
					<Pagination
						itemsCount={filtered.length}
						pageSize={pageSize}
						currentPage={currentPage}
						onPageChange={this.handlePagination}
					/>
				</div>
			</div>
		);
	}
}
