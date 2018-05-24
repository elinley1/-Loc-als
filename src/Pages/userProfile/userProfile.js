import React, { Component } from 'react'
import { FormControl, FormGroup, ControlLabel, HelpBlock, Checkbox, Radio, Button } from 'react-bootstrap';
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import { Col, Row, Grid } from "react-bootstrap";

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      blogs: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.render = this.render.bind(this);
  }

  componentDidMount () {
    this.getBlogs();
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  getUsername() {
    return this.props.user ? this.props.user.local.username : "";
  }


  getEmail() {
    return this.props.user ? this.props.user.email : "";
  }

  getFirstname() {
    return this.props.user ? this.props.user.firstName : "";
  }

  getLastname() {
    return this.props.user ? this.props.user.lastName : "";
  }

  getBlogs() {
    const userId = window.sessionStorage.getItem("userId");
    axios.get('/api/v1/Blog/')
      .then(response => {
        this.setState({
          blogs: response.data
        });
      })
      .catch(err => {
        console.log( err );
      });
  };

render() {
  return (
    <div>
      <h1>Username: {this.getUsername()}</h1>
      <h1>Email: {this.getEmail()}</h1>
      <h1>Firstname: {this.getFirstname()}</h1>
      <h1>Lastname: {this.getLastname()}</h1>
    
      <div>
        <h2>Your Posts</h2>
        <ul>
          {this.state.blogs.length ? this.state.blogs.map(blog => (
            <li>
              <p>{blog.title}</p>
              <p>{blog.body}</p>
              <p>{blog.raiting}</p>
            </li>
          )) : <h3>You no have posts.</h3>}
        </ul>
      </div> 
    </div>   
  );
};
};
export default UserProfile;