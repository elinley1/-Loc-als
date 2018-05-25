import React, { Component } from 'react'
import { FormControl, FormGroup, ControlLabel, HelpBlock, Checkbox, Radio, Button } from 'react-bootstrap';
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import {Input, TextArea, Jumbotron, Panel, Label, Well, PageHeader, Col, Row, Grid } from "react-bootstrap";

class BusinessPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      business: {},
      blogs: [],
      title: "", body: "", rating: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.render = this.render.bind(this);
    this.getBusiness = this.getBusiness.bind(this);
  }


  componentDidMount () {
    this.getBusiness();
  }

  getBusiness() {
    console.log("Business Page Props", this.props)
    let bid = this.props.match.params.id
    axios.get("/api/v1/Business/" + bid)
      .then(resp => {
        console.log("HTTP response for business", resp)
          this.setState({business: resp.data});
      })

    axios.get("/api/v1/Blog", {
      params: {
        query: {
          business: bid
        }
      }
    }).then(resp => {
      console.log("Response for matching blogs", resp)
      this.setState({blogs: resp.data});
    })
  }

  handleChange(event) {
		this.setState({
			[event.target.name]: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault();
    let newMessage = {
      title: this.state.title,
      rating: this.state.rating,
      body: this.state.body,
      business: this.state.business._id,
      author: this.props.user._id
    }
    console.log("New Message obj", newMessage)
    axios.post("/api/v1/Blog", newMessage)
      .then(response => {
        console.log("Create Blog Response", response);
        this.setState({title:  "", rating: "", body: ""})
        this.getBusiness()
      });
  }

  getBusinessField(field) {
    return this.state.business ? this.state.business[field] : null;
  }

  render() {
    return (
      <Grid>
        <Row>
          <Col md={6}>
            <h2>Business Details</h2>
            <h4>{this.getBusinessField("busName")}</h4>
          </Col>

          <Col md={6}>
            <h2>Make A Post</h2>
            
            <form>
              <FormGroup
                controlId="formBasicText" >
                <ControlLabel>Title</ControlLabel>
                <FormControl
                  type="text"
                  value={this.state.title}
                  name="title"
                  placeholder="Title"
                  onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup
                controlId="formBasicText" >
                <ControlLabel>Rating</ControlLabel>
                <FormControl
                  type="text"
                  value={this.state.rating}
                  name="rating"
                  placeholder="Rating"
                  onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup
                controlId="formBasicText" >
                <ControlLabel>Message</ControlLabel>
                <FormControl
                  componentClass="textarea"
                  value={this.state.body}
                  name="body"
                  placeholder="Message"
                  onChange={this.handleChange}
                />
              </FormGroup>

              <Button bsStyle="success" onClick={this.handleSubmit} type="submit">Message</Button>
            </form>

            <h2>Your Posts</h2>

            {this.state.blogs.length ? this.state.blogs.map(blog => (
              <Well key={blog._id}>
                <h4>{blog.title}</h4>
                <p><quote>{blog.body}</quote></p>
                Rating: <Label>{blog.rating}</Label>
              </Well>
            )) : <h3>Business has no posts</h3>}
          </Col>
        </Row>
      </Grid>
    )

  }
}

export default BusinessPage;
