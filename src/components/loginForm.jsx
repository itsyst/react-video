import React from 'react';
import Form from './common/form';
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
		return (
			<div className="container">
				<h1>Login</h1>
				<form onSubmit={this.handleSubmit}>
					{this.renderInput('username', 'Username')}
					{this.renderInput('password', 'Password', 'password')}
					{this.renderButton('Login')}
				</form>
			</div>
		);
	}
}
