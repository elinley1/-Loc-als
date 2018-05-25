import React, { Component } from 'react'
import { FormControl, FormGroup, ControlLabel, HelpBlock, Checkbox, Radio, Button } from 'react-bootstrap';
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import { Panel, Label, Well, PageHeader, Col, Row, Grid } from "react-bootstrap";

import { Link } from 'react-router-dom'

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props)
    this.state = {
      user: this.props.userFn(),
      searchTerm: "",
      blogs: [],
      businesses: {},
      searchResultsBusinesses: []
    };
    this.handleChangeSearch = this.handleChangeSearch.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.render = this.render.bind(this);
  }

  componentDidMount () {
    this.getBlogs();
  }

  componentDidUpdate() {
    if(this.state.user != this.props.userFn())
    {
      this.state.user = this.props.userFn()
       this.getBlogs();
     }
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

  handleChange(event) {
		this.setState({
			[event.target.name]: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault();
    let newBusiness = {
      busName: this.state.businessName,
      address: {
        street: this.state.businessStreet,
        city: this.state.businessCity,
        state: this.state.businessState,
        zip: this.state.businessZip
      },
      description: this.state.businessDescription,
      user: this.state.user._id
    }
    console.log("New Biz Obj", newBusiness)
    axios.post("/api/v1/Business", newBusiness)
      .then(response => {
        console.log("New Business Response", response)
        alert("Created new business " + newBusiness.busName);
        this.setState({
          businessName: "",
          businessStreet: "",
          businessCity: "",
          businessState: "",
          businessZip: "",
          businessDescription: ""
        })
      })
  }

  getUsername() {
    return this.state.user ? this.state.user.local.username : "";
  }

  getEmail() {
    return this.state.user ? this.state.user.email : "";
  }

  getFirstname() {
    return this.state.user ? this.state.user.firstName : "";
  }

  getLastname() {
    return this.state.user ? this.state.user.lastName : "";
  }

  getBlogs() {
    const userId = this.state.user ? this.state.user._id : null;
    console.log("Author ID", userId)
    axios.get('/api/v1/Blog/', {params: {query: {author: userId}}})
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
      <Col md={6}>
       <h1>Find A Business</h1> 
        <label>
          Search: <input type="text" value={this.state.searchTerm} onChange={this.handleChangeSearch} />
        </label>
            {this.state.searchResultsBusinesses.length ? this.state.searchResultsBusinesses.map(biz => (
              <Panel key={biz._id}>
                <Panel.Body>
                  <h3><small>Name:</small> {biz.busName}</h3>
                  <p><small>Description:</small> {biz.description}</p>

      				 		<Link to={"/business/" + biz._id} className="nav-link">
      				 			Details+
      				 		</Link>
                </Panel.Body>
              </Panel>
            )) : <h3>No Results</h3>}
      </Col>

      <Col md={6}>
        <h1>Register a business</h1>
            <form>
              <FormGroup
                controlId="formBasicText" >
                <ControlLabel>Business Name</ControlLabel>
                <FormControl
                  type="text"
                  value={this.state.businessName}
                  name="businessName"
                  placeholder="Name"
                  onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup
                controlId="formBasicText" >
                <ControlLabel>Address</ControlLabel>
                <FormControl
                  type="text"
                  value={this.state.businessStreet}
                  name="businessStreet"
                  placeholder="Street"
                  onChange={this.handleChange}
                />
              </FormGroup>

              <FormGroup
                controlId="formBasicText" >
                <ControlLabel>City</ControlLabel>
                <FormControl
                  type="text"
                  value={this.state.businessCity}
                  name="businessCity"
                  placeholder="City"
                  onChange={this.handleChange}
                />
              </FormGroup>

              <FormGroup
                controlId="formBasicText" >
                <ControlLabel>State</ControlLabel>
                <FormControl
                  type="text"
                  value={this.state.businessState}
                  name="businessState"
                  placeholder="State"
                  onChange={this.handleChange}
                />
              </FormGroup>

              <FormGroup
                controlId="formBasicText" >
                <ControlLabel>Zip</ControlLabel>
                <FormControl
                  type="text"
                  value={this.state.businessZip}
                  name="businessZip"
                  placeholder="Zip"
                  onChange={this.handleChange}
                />
              </FormGroup>

              <FormGroup
                controlId="formBasicText" >
                <ControlLabel>Description</ControlLabel>
                <FormControl
                  componentClass="textarea"
                  value={this.state.businessDescription}
                  name="businessDescription"
                  placeholder="Description"
                  onChange={this.handleChange}
                />
              </FormGroup>

              <Button bsStyle="success" onClick={this.handleSubmit} type="submit">Register</Button>
            </form>
      </Col>

      </Row> 
    </Grid>   
    </div>
  );
};
};
export default UserProfile;