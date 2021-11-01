import React, { Component } from 'react';
import ListGroup from './common/listGroup';
import MoviesTable from './moviesTable';
import Pagination from './common/pagination';
import SearchBox from './common/searchBox';
import { getGenres } from '../services/fakeGenreService';
import { getMovies, deleteMovie } from '../services/fakeMovieService';
import { paginate } from '../utils/paginate';
import _ from 'lodash';
import { Link } from 'react-router-dom';

export default class Movies extends Component {
	state = {
		movies: [],
		genres: [],
		currentPage: 1,
		pageSize: 4,
		searchQuery: '',
		selectedGenre: null,
		sortColumn: { path: 'title', order: 'asc' }
	};

	componentDidMount = () => {
		const uid = Date.now().toString(32) + Math.random();
		const genres = [{ _id: uid, name: 'All Genres' }, ...getGenres()];
		this.setState({ movies: getMovies(), genres: genres });
	};

	handleDelete = (movie) => {
		const movies = this.state.movies.filter((m) => m._id !== movie._id);
		this.setState({ movies });

		deleteMovie(movie._id);
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
		this.setState({
			selectedGenre: genre,
			searchQuery: '',
			currentPage: 1
		});
	};

	handleSearch = (query) => {
		this.setState({
			searchQuery: query,
			selectedGenre: null,
			currentPage: 1
		});
	};

	handleSort = (sortColumn) => {
		this.setState({ sortColumn });
	};

	getPagedData = () => {
		const {
			pageSize,
			currentPage,
			sortColumn,
			selectedGenre,
			searchQuery,
			movies: allMovies
		} = this.state;

		let filtered = allMovies;
		if (searchQuery)
			filtered = allMovies.filter((m) =>
				m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
			);
		else if (selectedGenre && selectedGenre._id)
			filtered = allMovies.filter(
				(m) => m.genre._id === selectedGenre._id
			);

		const sorted = _.orderBy(
			filtered,
			[sortColumn.path],
			[sortColumn.order]
		);

		const movies = paginate(sorted, currentPage, pageSize);

		return { totalCount: filtered.length, data: movies };
	};

	render() {
		const { length: count } = this.state.movies;
		const { pageSize, currentPage, genres, selectedGenre, sortColumn } =
			this.state;

		if (count === 0)
			return <p className="py-3">There is no movies in the database.</p>;

		const { totalCount, data: movies } = this.getPagedData(selectedGenre);

		return (
			<div className="row">
				<div className="col-3">
					<ListGroup
						items={genres}
						selectedItem={selectedGenre}
						onItemSelect={this.handleGenreSelect}
						// textProperty="_id" // these two properties are defined in listGroup comp
						// valueProperty="name"
					/>
				</div>
				<div className="col">
					<Link
						to="/movies/new"
						className="btn btn-primary"
						style={{ marginBottom: 20 }}
					>
						New Movie
					</Link>
					<p style={{ marginBottom: -10 }}>
						Showing {totalCount} movies in the database.
					</p>
					<SearchBox
						value={this.state.searchQuery}
						onChange={this.handleSearch}
					/>
					<MoviesTable
						movies={movies}
						sortColumn={sortColumn}
						onLike={this.handleLiked}
						onDelete={this.handleDelete}
						onSort={this.handleSort}
					/>
					<Pagination
						itemsCount={totalCount}
						pageSize={pageSize}
						currentPage={currentPage}
						onPageChange={this.handlePagination}
					/>
				</div>
			</div>
		);
	}
}
