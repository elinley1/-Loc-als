import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
// import googleButton from './google_signin_buttons/web/1x/btn_google_signin_dark_disabled_web.png'
import googleButton from './google_signin_buttons/web/1x/btn_google_signin_dark_normal_web.png'
import { Col, Row, Container } from "../../components/Grid";
import { Input } from "../../components/Form";

class LoginForm extends Component {
	constructor() {
		super()
		this.state = {
			username: '',
			password: '',
			redirectTo: null
		}
		// this.googleSignin = this.googleSignin.bind(this)
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
		console.log('handleSubmit')
		this.props._login(this.state.username, this.state.password)
		this.setState({
			redirectTo: '/'
		})
	}

	render() {
		if (this.state.redirectTo) {
			return <Redirect to={{ pathname: this.state.redirectTo }} />
		} else {
			return (
				<Container>
				<h1>Login form</h1>
                <Row>
                    <Col size="col-md-6">
                        <form>
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
							<button onClick={this.handleSubmit}>Login</button>
						</form>
					<a href="/auth/google">
						{/* <GoogleButton /> */}
						<img src={googleButton} alt="sign into Google Button" />
					</a>
					</Col>
				</Row>
				</Container>
			)
		}
	}
}

export default LoginForm
