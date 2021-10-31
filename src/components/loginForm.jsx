import React, { Component } from 'react';

export default class LoginForm extends Component {
	username = React.createRef();

	componentDidMount() {
		// this.username.current.focus();
	}

	handleSubmit = (e) => {
		e.preventDefault();

		// Call the server
		// Save the changed
		// Redirect the user to a different page
		const username = this.username.current.value;
		console.log('Submitted', username);
	};
	render() {
		return (
			<div className="container">
				<h1>Login</h1>
				<form onSubmit={this.handleSubmit}>
					<div className="form-group">
						<label htmlFor="username">Username</label>
						<input
							autoFocus
							id="username"
							// ref={this.username}
							type="text"
							className="form-control"
						/>
					</div>
					<div className="form-group mb-3">
						<label htmlFor="password">Password</label>
						<input
							id="password"
							type="text"
							className="form-control"
						/>
					</div>
					<button className="btn btn-primary">Login</button>
				</form>
			</div>
		);
	}
}
