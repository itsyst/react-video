import React from 'react';
import Form from './common/form';
import Joi from 'joi';
import * as userService from '../services/userService';

export default class RegisterForm extends Form {
	state = {
		data: { email: '', password: '', name: '' },
		errors: {}
	};

	schema = Joi.object({
		email: Joi.string()
			.email({
				minDomainSegments: 2,
				tlds: { allow: ['se', 'com', 'net'] }
			})
			.label('Email'),
		password: Joi.string().min(6).required().label('Password'),
		name: Joi.string().min(4).label('Name')
	});

	doSubmit = async () => {
		try {
			await userService.register(this.state.data);
		} catch (ex) {
			if (ex.response && ex.response.status === 400) {
				const errors = { ...this.state.errors };
				errors.email = ex.response.data;
				this.setState({ errors });
			}
		}
	};

	render() {
		return (
			<div className="container">
				<h1>Register</h1>
				<form onSubmit={this.handleSubmit}>
					{this.renderInput('email', 'Username', 'email')}
					{this.renderInput('password', 'Password', 'password')}
					{this.renderInput('name', 'Name')}
					{this.renderButton('Register')}
				</form>
			</div>
		);
	}
}
