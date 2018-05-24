import React, { Component } from 'react'
import {FormControl, FormGroup, ControlLabel, HelpBlock, Checkbox, Radio, Button} from 'react-bootstrap';
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import { Col, Row, Grid } from "react-bootstrap";

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ""};
    console.log("user profile props", props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.render = this.render.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
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

  render() {
    return (
        <div>
            <h1>Username: {this.getUsername()}</h1> 
            <h1>Email: {this.getEmail()}</h1> 
            <h1>Firstname: {this.getFirstname()}</h1> 
            <h1>Lastname: {this.getLastname()}</h1> 
      </div>
    );
  }
}

export default UserProfile;