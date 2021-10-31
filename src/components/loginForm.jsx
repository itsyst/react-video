import React, { Component } from 'react';

export default class LoginForm extends Component {
	state = {
		account: {
			username: '',
			password: ''
		}
	};

	handleSubmit = (e) => {
		e.preventDefault();
		const user = this.state.account;
		console.log('Submitted', user);
	};

	handleChange = (e) => {
		const account = { ...this.state.account };
		account[e.currentTarget.name] = e.currentTarget.value;
		this.setState({ account });
	};

	render() {
		return (
			<div className="container">
				<h1>Login</h1>
				<form onSubmit={this.handleSubmit}>
					<div className="form-group">
						<label htmlFor="username">Username</label>
						<input
							id="username"
							value={this.state.account.username}
							onChange={this.handleChange}
							name="username"
							type="text"
							className="form-control"
							autoFocus
						/>
					</div>
					<div className="form-group mb-3">
						<label htmlFor="password">Password</label>
						<input
							id="password"
							value={this.state.account.password}
							onChange={this.handleChange}
							name="password"
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
