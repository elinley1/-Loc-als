import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import { Route, Link } from 'react-router-dom'
import './App.css'
import LoginForm from './components/Login/LoginForm'
import SignupForm from './components/SignupForm'
import Header from './components/Header'
import Home from './components/Home'
import Blogs from './Pages/Blog'
import Navbar from './components/Navbar'
import UserProfile from './Pages/userProfile/userProfile'
import BusinessPage from './Pages/Business/businessPage'

// const DisplayLinks = props => {
// 	if (props.loggedIn) {
// 		return (
// 			<nav className="navbar">
// 				<ul className="nav">
// 					<li className="nav-item">
// 						<Link to="/" className="nav-link">
// 							Home
// 						</Link>
// 					</li>
// 					<li>
// 						<Link to="#" className="nav-link" onClick={props._logout}>
// 							Logout
// 						</Link>
// 					</li>
// 				</ul>
// 			</nav>
// 		)
// 	} else {
// 		return (
// 			<nav className="navbar">
				// <ul className="nav">
				// 	<li className="nav-item">
				// 		<Link to="/" className="nav-link">
				// 			Home
				// 		</Link>
				// 	</li>
				// 	<li className="nav-item">
				// 		<Link to="/login" className="nav-link">
				// 			login
				// 		</Link>
				// 	</li>
				// 	<li className="nav-item">
				// 		<Link to="/signup" className="nav-link">
				// 			sign up
				// 		</Link>
				// 	</li>
				// </ul>
// 			</nav>
// 		)
// 	}
// }

class App extends Component {
	constructor() {
		super()
		this.state = {
			loggedIn: false,
			user: null
		}
		this._logout = this._logout.bind(this)
		this._login = this._login.bind(this)
	}
	componentWillMount() {
		axios.get('/auth/user').then(response => {
			if (!!response.data.user) {
				this.setState({
					loggedIn: true,
					user: response.data.user
				})
				window.sessionStorage.setItem( "userId", response.data.user._id );
			} else {
				this.setState({
					loggedIn: false,
					user: null
				})
			}
		})
	}

	_logout(event) {
		event.preventDefault()
		console.log('logging out')
		axios.post('/auth/logout').then(response => {
			console.log(response.data)
			if (response.status === 200) {
				this.setState({
					loggedIn: false,
					user: null
				})
			}
		})
	}

	_login(username, password) {
		axios
			.post('/auth/login', {
				username,
				password
			})
			.then(response => {
				console.log(response)
				if (response.status === 200) {
					// update the state
					this.setState({
						loggedIn: true,
						user: response.data.user
					})
				}
			})
	}

	render() {
		return (
			<div className="App">
				{/* <Header user={this.state.user} /> */}
				{/* LINKS to our different 'pages' */}
				{/* <DisplayLinks _logout={this._logout} loggedIn={this.state.loggedIn} /> */}
				{/*  ROUTES */}
				{/* <Route exact path="/" component={Home} /> */}
				
				<Route exact path="/" render={() => <Home user={this.state.user} />} />
				<Route
					exact
					path="/login"
					render={() =>
						<LoginForm
							_login={this._login}
							_googleSignin={this._googleSignin}
						/>}
				/>
				<Route exact path ="/blogpost" component= {Blogs} />
				<Route exact path="/signup" component={SignupForm} />
				<Route exact path="/profile" render={() => <UserProfile user={this.state.user} />} />
				<Route exact path="/business/:id" render={(props) => <BusinessPage {...props} user={this.state.user} />}/>
				{/* <LoginForm _login={this._login} /> */}

			</div>
		)
	}
}

export default App
