import * as Sentry from '@sentry/react';
import { ToastContainer } from 'react-toastify';
import React, { Component } from 'react';
import { Route, Redirect, Switch, useHistory } from 'react-router-dom';
import Customers from './components/customers';
import Movies from './components/movies';
import MovieForm from './components/movieForm';
import Navbar from './components/navbar';
import NotFound from './components/notFound';
import LoginForm from './components/loginForm';
import RegisterForm from './components/registerForm';
import Rentals from './components/rentals';
import Logout from './components/logout';
import auth from './services/authService';
import 'react-toastify/dist/ReactToastify.css'
import './App.css';


export default class App extends Component {
	state = {};

	componentDidMount() {
		const user = auth.getCurrentUser();
		this.setState({ user });

	}

	render() {
		const { user } = this.state;
		return (
			<React.Fragment>
				<Sentry.ErrorBoundary
					beforeCapture={(scope) => {
						scope.setTag("location", "first");
						scope.setTag("anotherTag", "anotherValue");
					}}
				>
					<ToastContainer />
					<Navbar user={user} />
					<main className="container col-lg-8 p-3 py-md-5">
						<Switch>
							<Route path="/login" component={LoginForm} />
							<Route path="/register" component={RegisterForm} />
							<Route path="/logout" component={Logout} />
							<Route path="/movies/:id"
								render={props => {
									if (!user) return <Redirect to="/login" />;
									return <MovieForm {...props} />;
								}}
							/>
							<Route path="/movies" render={props => <Movies {...props} user={user} />} />
							<Route path="/customers" component={Customers} />
							<Route path="/rentals" component={Rentals} />
							<Route path="/not-found" component={NotFound} />
							<Redirect from="/" exact to="/movies" />
							<Redirect to="/not-found" />
						</Switch>
					</main>
				</Sentry.ErrorBoundary>
			</React.Fragment>
		)
	}
}

