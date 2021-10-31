import React, { Component } from 'react';
import Input from './common/input';
import Joi from 'joi';

export default class LoginForm extends Component {
	state = {
		account: { username: '', password: '' },
		errors: {}
	};

	schema = Joi.object({
		username: Joi.string()
			.alphanum()
			.min(3)
			.max(30)
			.required()
			.label('Username'),
		password: Joi.string().min(6).required().label('Password')
	});

	validate = () => {
		const options = { abortEarly: false };
		const { error } = this.schema.validate(this.state.account, options);

		if (!error) return null;

		const errors = {};
		for (let item of error.details) errors[item.path[0]] = item.message;
		return errors;
	};

	handleSubmit = (e) => {
		e.preventDefault();

		const errors = this.validate();
		this.setState({ errors: errors || {} });
		if (errors) return;

		// Call the server
		console.log('Submitted');
	};

	validateProperty = ({ name, value }) => {
		if (name === 'username') {
			if (value.trim() === '') return 'Username are required.';
			//...
		}
		if (name === 'password') {
			if (value.trim() === '') return 'Password are required.';
			//...
		}
	};

	handleChange = ({ currentTarget: input }) => {
		const errors = { ...this.state.errors };
		const errorMessage = this.validateProperty(input);
		if (errorMessage) errors[input.name] = errorMessage;
		else delete errors[input.name];

		const account = { ...this.state.account };
		account[input.name] = input.value;

		this.setState({ account, errors });
	};

	render() {
		const { account, errors } = this.state;
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
						error={errors.username}
					/>
					<Input
						id="password"
						value={account.password}
						name="password"
						label="Password"
						onChange={this.handleChange}
						error={errors.password}
					/>
					<button className="btn btn-primary mt-3">Login</button>
				</form>
			</div>
		);
	}
}
