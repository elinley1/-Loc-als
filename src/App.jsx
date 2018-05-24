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

const DisplayLinks = props => {
	if (props.loggedIn) {
		return (
			<nav className="navbar">
				<ul className="nav">
					<li className="nav-item">
						<Link to="/" className="nav-link">
							Home
						</Link>
					</li>
					<li>
						<Link to="#" className="nav-link" onClick={props._logout}>
							Logout
						</Link>
					</li>
				</ul>
			</nav>
		)
	} else {
		return (
			<nav className="navbar">
				<ul className="nav">
					<li className="nav-item">
						<Link to="/" className="nav-link">
							Home
						</Link>
					</li>
					<li className="nav-item">
						<Link to="/login" className="nav-link">
							login
						</Link>
					</li>
					<li className="nav-item">
						<Link to="/signup" className="nav-link">
							sign up
						</Link>
					</li>
				</ul>
			</nav>
		)
	}
}

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
	componentDidMount() {
		axios.get('/auth/user').then(response => {
			console.log(response.data)
			if (!!response.data.user) {
				console.log('THERE IS A USER')
				this.setState({
					loggedIn: true,
					user: response.data.user
				})
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
				{/* <h1>This is the main App component</h1>
				<Header user={this.state.user} /> */}
				{/* LINKS to our different 'pages' */}
				{/* <DisplayLinks _logout={this._logout} loggedIn={this.state.loggedIn} /> */}
				{/*  ROUTES */}
				{/* <Route exact path="/" component={Home} /> */}
				{/* <Route exact path="/" render={() => <Home user={this.state.user} />} />
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
				<Route exact path="/signup" component={SignupForm} /> */}
				{/* <LoginForm _login={this._login} /> */}

						{/* <Navbar>
  <Navbar.Header>
    <Navbar.Brand>
      <a href="#home">React-Bootstrap</a>
    </Navbar.Brand>
  </Navbar.Header>
  <Nav>
    <NavItem eventKey={1} href="#">
      Link
    </NavItem>
    <NavItem eventKey={2} href="#">
      Link
    </NavItem>
    <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
      <MenuItem eventKey={3.1}>Action</MenuItem>
      <MenuItem eventKey={3.2}>Another action</MenuItem>
      <MenuItem eventKey={3.3}>Something else here</MenuItem>
      <MenuItem divider />
      <MenuItem eventKey={3.4}>Separated link</MenuItem>
    </NavDropdown>
  </Nav>
</Navbar>; */}

			    <nav className="navbar navbar-expand-lg navbar-light fixed-top" id="mainNav">
      				<div className="container">
        				<a className="navbar-brand js-scroll-trigger" href="#page-top">(Loc)als</a>
        				<button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
          					Menu
          					<i className="fa fa-bars"></i>
        				</button>
        				<div className="collapse navbar-collapse" id="navbarResponsive">
          					<ul className="navbar-nav ml-auto">
            					<li className="nav-item">
              						<a className="nav-link js-scroll-trigger" href="#download">Home</a>
            					</li>
            					<li className="nav-item">
              						<a className="nav-link js-scroll-trigger" href="#features">Login</a>
            					</li>
            					<li className="nav-item">
              						<a className="nav-link js-scroll-trigger" href="#contact">Sign Up</a>
            					</li>
          					</ul>
        				</div>
      				</div>
    			</nav>

    			<header className="masthead">
      				<div className="container h-100">
        				<div className="row h-100">
          					<div className="col-lg-7 my-auto">
            					<div className="header-content mx-auto">
              						<h1 className="mb-5">(Loc)als</h1>
              						<p>Travel like a local.</p>
              						<a href="#download" className="btn btn-outline btn-xl js-scroll-trigger">Register for Free!</a>
            					</div>
          					</div>
          					<div className="col-lg-5 my-auto">
            					<div className="device-container">
              						<div className="device-mockup iphone6_plus portrait white">
                						<div className="device">
                  							<div className="screen">
                    							<img src="img/demo-screen-1.jpg" className="img-fluid" alt=""/>
                  							</div>
                  							<div className="button">
				  							</div>
                						</div>
              						</div>
            					</div>
          					</div>
        				</div>
      				</div>
    			</header>

    			<section className="cta">
      				<div className="cta-content">
        				<div className="container">
          					<h2>Travel.Explore.</h2>
          					<a href="#contact" className="btn btn-outline btn-xl js-scroll-trigger">Login</a>
        				</div>
      				</div>
      				<div className="overlay"></div>
    			</section>

    			<footer>
      				<div className="container">
        				<p>&copy; (Loc)als 2018. All Rights Reserved.</p>
        				<ul className="list-inline">
          					<li className="list-inline-item">
            					<a href="#">Privacy</a>
          					</li>
          					<li className="list-inline-item">
            					<a href="#">Terms</a>
          					</li>
          					<li className="list-inline-item">
            					<a href="#">FAQ</a>
          					</li>
        				</ul>
      				</div>
    			</footer>

			</div>
		)
	}
}

export default App
