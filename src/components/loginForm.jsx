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

	handleChange = ({ currentTarget: input }) => {
		const account = { ...this.state.account };
		account[input.name] = input.value;
		this.setState({ account });
	};

	render() {
		const { account } = this.state;
		return (
			<div className="container">
				<h1>Login</h1>
				<form onSubmit={this.handleSubmit}>
					<div className="form-group">
						<label htmlFor="username">Username</label>
						<input
							id="username"
							value={account.username}
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
							value={account.password}
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
