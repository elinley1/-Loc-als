import React, {Component} from 'react'
import {Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap'
import {Link} from 'react-router-dom'

const NavbarComponent = (props) => (

    <Navbar>
        <Navbar.Header>
            <Navbar.Brand>
                <Link to="/" className="nav-link">(Loc)als</Link>
            </Navbar.Brand>
        </Navbar.Header>
        <Nav>

            <NavItem eventKey={1} href="#">
                {props.user ? (<Link to="/profile" className="nav-link">Dashboard</Link>) : (<Link to="/login" className="nav-link">Login</Link>)}
            </NavItem>
            <NavItem eventKey={2} href="#">
                {props.user ? (<Link to="/logout" className="nav-link">Logout</Link>) : (<Link to="/signup" className="nav-link">Sign Up</Link>)}
            </NavItem>
        </Nav>
    </Navbar>

);

export default NavbarComponent