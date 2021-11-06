import React from 'react';
import Form from './common/form';
import Joi from 'joi';
import * as authService from '../services/authService';

export default class LoginForm extends Form {
	state = {
		data: { username: '', password: '' },
		errors: {}
	};

	schema = Joi.object({
		username: Joi.string()
			.min(3)
			.max(30)
			.required()
			.label('Username'),
		password: Joi.string().min(6).required().label('Password')
	});

	doSubmit = async () => {
		try {
			const { data } = this.state;
			await authService.login(data.username, data.password);
		} catch (ex) {
			if (ex.response && ex.response.status === 401) {
				const errors = { ...this.state.errors };
				errors.email = ex.response.data;
				this.setState({ errors });
			}
		}
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
