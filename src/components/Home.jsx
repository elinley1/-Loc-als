import React, {Component} from 'react'
import {Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import LogoImage from '../logo.png'
class Home extends Component {
	render(){
		return(
			<div>
    			<section className="cta">
      				<div className="cta-content">
						<div className="container">
          					<h2>Travel.Explore.</h2>
							 <div> <img src={LogoImage} /> </div>
							 <br/>
							 <div>

      				 		<Link to="/signup" className="btn btn-outline btn-xl js-scroll-trigger">
      				 			Register for Free!
      				 		</Link>
							</div>
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
