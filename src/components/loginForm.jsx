import React from 'react';
import Form from './common/form';
import Input from './common/input';
import Joi from 'joi';

export default class LoginForm extends Form {
	state = {
		data: { username: '', password: '' },
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

	doSubmit = () => {
		// Call the server
		console.log('Submitted');
	};

	render() {
		const { data, errors } = this.state;
		return (
			<div className="container">
				<h1>Login</h1>
				<form onSubmit={this.handleSubmit}>
					<Input
						id="username"
						value={data.username}
						name="username"
						label="Username"
						onChange={this.handleChange}
						autoFocus
						error={errors.username}
					/>
					<Input
						id="password"
						value={data.password}
						name="password"
						label="Password"
						onChange={this.handleChange}
						error={errors.password}
					/>
					<button
						disabled={this.validate()}
						className="btn btn-primary mt-3"
					>
						Login
					</button>
				</form>
			</div>
		);
	}
}
