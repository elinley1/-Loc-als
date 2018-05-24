import React, { Component } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import { Col, Row, Grid } from "react-bootstrap";
import { Input, TextArea, FormBtn } from "../components/Form";

class createBusiness extends Component {
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
		axios.post('/api/v1/Business/:userId', { //Not sure how to route the userID here, but that's the route you had in the readme
			address: {
				street: this.state.street,
				city: this.state.city,
				state: this.state.state,
				zip: this.state.zip,
			},
			email: this.state.email,
			local: {
				username: this.state.username,
			},
			description: this.state.description
		})
			.then(response => {
				console.log(response)
				if (!response.data.errmsg) {
					console.log('youre good')
					this.setState({
						redirectTo: '/Business/:userID' // Not sure if this is correct
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
				<h1>Add Business</h1>
                <Row>
                    <Col size="col-md-6 col-md-offset-3">
                        <form>
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
                                type="text"
								name="username"
								value={this.state.username}
								onChange={this.handleChange}
								placeholder="Username"
                            />
							<Input
                                type="text"
								name="email"
								value={this.state.email}
								onChange={this.handleChange}
								placeholder="Email Address"
                            />
							<TextArea
                                type="text"
								name="description"
								value={this.state.description}
								onChange={this.handleChange}
								placeholder="Description"
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
