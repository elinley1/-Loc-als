import React, { Component } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

class SignupForm extends Component {
	constructor() {
		super()
		this.state = {
			username: '',
			password: '',
			confirmPassword: '',
			redirectTo: null
		}
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleChange = this.handleChange.bind(this)
	}
	handleChange(event) {
		this.setState({
			[event.target.name]: event.target.value
		})
	}
	handleSubmit(event) {
		event.preventDefault()
		// TODO - validate!
		axios
			.post('/auth/signup', {
				firstName: this.state.firstName,
				lastName: this.state.lastName,
				username: this.state.username,
				password: this.state.password,
				street: this.state.street,
				city: this.state.city,
				state: this.state.state,
				zip: this.state.zip,
				cityDuration: this.state.cityDuration,
				email: this.state.email

			})
			.then(response => {
				console.log(response)
				if (!response.data.errmsg) {
					console.log('youre good')
					this.setState({
						redirectTo: '/login'
					})
				} else {
					console.log('duplicate')
				}
			})
	}
	render() {
		if (this.state.redirectTo) {
			return <Redirect to={{ pathname: this.state.redirectTo }} />
		}
		return (
			<div className="SignupForm">
				<h1>Signup form</h1>
				<label htmlFor="firstName">First Name: </label>
				<input
					type="text"
					name="firstName"
					value={this.state.firstName}
					onChange={this.handleChange}
				/>
				<label htmlFor="lastName">Last Name: </label>
				<input
					type="text"
					name="lastName"
					value={this.state.lastName}
					onChange={this.handleChange}
				/>
				<label htmlFor="username">Username: </label>
				<input
					type="text"
					name="username"
					value={this.state.username}
					onChange={this.handleChange}
				/>
				<label htmlFor="password">Password: </label>
				<input
					type="password"
					name="password"
					value={this.state.password}
					onChange={this.handleChange}
				/>
				<label htmlFor="confirmPassword">Confirm Password: </label>
				<input
					type="password"
					name="confirmPassword"
					value={this.state.confirmPassword}
					onChange={this.handleChange}
				/>
				<label htmlFor="street">Street Address: </label>
				<input
					type="text"
					name="street"
					value={this.state.street}
					onChange={this.handleChange}
				/>
				<label htmlFor="city">City: </label>
				<input
					type="text"
					name="city"
					value={this.state.city}
					onChange={this.handleChange}
				/>
				<label htmlFor="state">State: </label>
				<input
					type="text"
					name="state"
					value={this.state.state}
					onChange={this.handleChange}
				/>
				<label htmlFor="zip">Zip: </label>
				<input
					type="text"
					name="zip"
					value={this.state.zip}
					onChange={this.handleChange}
				/>
				<label htmlFor="cityDuration">City Duration: </label>
				<input
					type="cityDuration"
					name="cityDuration"
					value={this.state.cityDuration}
					onChange={this.handleChange}
				/>
				<label htmlFor="email">Email: </label>
				<input
					type="text"
					name="email"
					value={this.state.email}
					onChange={this.handleChange}
				/>
				<button onClick={this.handleSubmit}>Sign up</button>
			</div>
		)
	}
}

export default SignupForm
