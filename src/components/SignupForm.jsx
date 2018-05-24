import React, { Component } from 'react'
import {FormControl, FormGroup, ControlLabel, HelpBlock, Checkbox, Radio, Button} from 'react-bootstrap';
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import { Col, Row, Grid } from "react-bootstrap";
import { Input, TextArea, FormBtn } from "../components/Form";
import './SignupForm.css'

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
		axios.post('/api/v1/User', {
			firstName: this.state.firstName,
			lastName: this.state.lastName,
			local: {
				username: this.state.username,
				password: this.state.password,
			},
			address: {
				street: this.state.street,
				city: this.state.city,
				state: this.state.state,
				zip: this.state.zip,
			},
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
			<Grid>
				<h1>Signup</h1>
                <Row>
                    <Col size="col-md-6 col-md-offset-3">
                        <form>
                            <Input
                                type="text"
								name="firstName"
								value={this.state.firstName}
								onChange={this.handleChange}
                                placeholder="First Name"
                            />
                            <Input
                                type="text"
								name="lastName"
								value={this.state.lastName}
								onChange={this.handleChange}
								placeholder="Last Name"
                            />
                            <Input
                                type="text"
								name="username"
								value={this.state.username}
								onChange={this.handleChange}
								placeholder="Username"
                            />
                            <Input
                                type="password"
								name="password"
								value={this.state.password}
								onChange={this.handleChange}
								placeholder="Password"
                            />
							<Input
                                type="password"
								name="confirmPassword"
								value={this.state.confirmPassword}
								onChange={this.handleChange}
								placeholder="Confirm Password"
                            />
							<Input
                                type="text"
								name="street"
								value={this.state.street}
								onChange={this.handleChange}
								placeholder="Street Address"
                            />
							<Input
                                type="text"
								name="city"
								value={this.state.city}
								onChange={this.handleChange}
								placeholder="City"
                            />
							<Input
                                type="text"
								name="state"
								value={this.state.state}
								onChange={this.handleChange}
								placeholder="State"
                            />
							<Input
                                type="text"
								name="zip"
								value={this.state.zip}
								onChange={this.handleChange}
								placeholder="Zip"
                            />
							<Input
                                type="cityDuration"
								name="cityDuration"
								value={this.state.cityDuration}
								onChange={this.handleChange}
								placeholder="Time lived in city"
                            />
							<Input
                                type="text"
								name="email"
								value={this.state.email}
								onChange={this.handleChange}
								placeholder="Email Address"
                            />
                            <FormBtn onClick={this.handleSubmit}>Submit</FormBtn>
                        </form>
                    </Col>
                </Row>
            </Grid>
    	);
	}
}

export default SignupForm
