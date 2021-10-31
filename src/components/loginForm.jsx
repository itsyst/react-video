import React, { Component } from 'react';
import Input from './common/input';

export default class LoginForm extends Component {
	state = {
		account: {
			username: '',
			password: ''
		}
	};

	handleSubmit = (e) => {
		e.preventDefault();

		// Call the server
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
					<Input
						id="username"
						value={account.username}
						name="username"
						label="Username"
						onChange={this.handleChange}
						autoFocus
					/>
					<Input
						id="password"
						value={account.password}
						name="password"
						label="Password"
						onChange={this.handleChange}
					/>
					<button className="btn btn-primary mt-3">Login</button>
				</form>
			</div>
		);
	}
}
