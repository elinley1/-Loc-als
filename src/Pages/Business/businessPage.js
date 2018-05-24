import React, { Component } from 'react'
import { FormControl, FormGroup, ControlLabel, HelpBlock, Checkbox, Radio, Button } from 'react-bootstrap';
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import {Jumbotron, Panel, Label, Well, PageHeader, Col, Row, Grid } from "react-bootstrap";

class BusinessPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      business: {},
      blogs: []
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
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
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
