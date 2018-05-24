import React, { Component } from 'react'
import { FormControl, FormGroup, ControlLabel, HelpBlock, Checkbox, Radio, Button } from 'react-bootstrap';
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import { Col, Row, Grid } from "react-bootstrap";

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.render = this.render.bind(this);
  }



  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  getName() {
    return this.props.business ? this.props.business.busName : "";
  }

  getStreet() {
    return this.props.business ? this.props.business.address.street : "";
  }

  getCity() {
    return this.props.business ? this.props.business.address.city : "";
  }
  getState() {
    return this.props.business ? this.props.business.address.state : "";
  }
  getZip() {
    return this.props.business ? this.props.business.address.zip : "";
  }

  getDescription() {
    return this.props.business ? this.props.business.description : "";
  }
  render() {
    return (
      <div>
        <h1>Business Name: {this.getName()}</h1>
        <h1>Address: </h1>
        <span> {this.getStreet} </span>
        <span> {this.getCity} </span>
        <span> {this.getState}, {this.getZip} </span>
        <h1>Description: </h1>
        <div> {this.getDescription()} </div>
      </div>   
    );
  };
  };
  export default UserProfile;