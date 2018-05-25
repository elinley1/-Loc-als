import React, {Component} from 'react'
import {Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap'
import {Link} from 'react-router-dom'
// TODO - add proptypes

// const Home = props => {
// 	if (props.user) {
// 		return (
// 			<div className="Home">
// 				<p>Current User:</p>
// 				<code>
// 					{JSON.stringify(props)}
// 				</code>
// 			</div>
// 		)
// 	} else {
// 		return (
// 			<div className="Home">
// 				<p>Current User:</p>
// 				<code>
// 					{JSON.stringify(props)}
// 				</code>
// 			</div>
// 		)
// 	}
// }

class Home extends Component {
	render(){
		return(
			<div>

    			<header className="masthead">
      				<div className="container h-100">
        				<div className="row h-100">
          					<div className="col-lg-7 my-auto">
            					<div className="header-content mx-auto">
              						<h1 className="mb-5">(Loc)als</h1>
              						<p>Travel like a local.</p>
              						<a href="/signup" className="btn btn-outline btn-xl js-scroll-trigger">Register for Free!</a>
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
          					<a href="/login" className="btn btn-outline btn-xl js-scroll-trigger">Login</a>
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
export default Home
