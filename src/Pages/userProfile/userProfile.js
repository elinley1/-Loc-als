import React, { Component } from 'react'
import { FormControl, FormGroup, ControlLabel, HelpBlock, Checkbox, Radio, Button } from 'react-bootstrap';
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import {Panel, Label, Well, PageHeader, Col, Row, Grid } from "react-bootstrap";

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      searchTerm: "",
      blogs: [],
      businesses: {},
      searchResultsBusinesses: []
    };
    this.handleChangeSearch = this.handleChangeSearch.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.render = this.render.bind(this);
  }

  componentDidMount () {
    this.getBlogs();
  }

  handleChangeSearch(event) {
    this.setState({ searchTerm: event.target.value });
    let params = {
          params: {query: {
            busName: {"$regex": "(" + this.state.searchTerm + ")"}
          }
         }
        }
        console.log(params);
    axios.get('/api/v1/Business',params).then((response) => {
      console.log("Search response", response)
      this.setState( {searchResultsBusinesses: response.data} );
    })    
  }

  handleSubmit(event) {
    console.log("Event Submit", event)
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
    const userId = this.props.user ? this.props.user._id : null;
    axios.get('/api/v1/Blog/')
      .then(response => {
        let blogPosts = response.data;
        let assocBusinessIds = blogPosts.map(p => { return {"_id": p.business }})
        let assocBusinessQuery = {params: {query: {"$or": assocBusinessIds}} }
        console.log(assocBusinessQuery);
        axios.get("/api/v1/Business", assocBusinessQuery)
          .then(bizResponse => {
            let matchingBusinesses = bizResponse.data
            var businessIdMap = {}
            matchingBusinesses.forEach(biz => {
              businessIdMap[biz._id] = biz
            });
            console.log(matchingBusinesses, businessIdMap)

            this.setState({businesses: businessIdMap});
          })

        this.setState({
          blogs: response.data
        });
      })
      .catch(err => {
        console.log( err );
      });
  };

  getPostBusinessField(post, field) {
    return this.state.businesses[post.business] ? this.state.businesses[post.business][field] : null
  }

render() {
  return (
    <div>

      <PageHeader>
        <Grid>
          <Row>
            <Col md={12}>
              <small>Happy Travels,</small> {this.getFirstname()}
            </Col>
          </Row>
        </Grid>
      </PageHeader>;
    <Grid>
      <Row>
        <Col md={6}>
        <h2>Personal Details</h2>
        <ul>
      <li>Username: {this.getUsername()}</li>
      <li>Email: {this.getEmail()}</li>
      <li>Firstname: {this.getFirstname()}</li>
      <li>Lastname: {this.getLastname()}</li>
      </ul>
      </Col>

      <Col md={6}>
        <h2>Your Posts</h2>
            {this.state.blogs.length ? this.state.blogs.map(blog => (
              <Well key={blog._id}>
                <h4>{blog.title} <i>@ {this.getPostBusinessField(blog, "busName")}</i></h4>
                <p><quote>{blog.body}</quote></p>
                Rating: <Label>{blog.rating}</Label>
              </Well>
            )) : <h3>You no have posts.</h3>}
      </Col>
      </Row>
    
      <Row>
        
        <label>
          Search: <input type="text" value={this.state.searchTerm} onChange={this.handleChangeSearch} />
        </label>
            {this.state.searchResultsBusinesses.length ? this.state.searchResultsBusinesses.map(biz => (
              <Panel key={biz._id}>
                <Panel.Body>
                  <h3><small>Name:</small> {biz.busName}</h3>
                  <p><small>Description:</small> {biz.description}</p>
                </Panel.Body>
              </Panel>
            )) : <h3>No Results</h3>}
      </Row> 
    </Grid>   
    </div>
  );
};
};
export default UserProfile;