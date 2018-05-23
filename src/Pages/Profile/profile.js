import React, { Component } from "react";

import Jumbotron from "../../components/Jumbotron";
import API from "/../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn } from "../../components/Form";

class profile extends Component {
    state = {
        blogs: [],
        busName: "",
        address: "",
        email: "",
        username: "",
        description: ""
    };

    render() {
        return (
            <Container fluid>
                <Row>
                    <Col size="md-6">
                        <Jumbotron>
                            <h1>{this.business}</h1>
                        </Jumbotron>
                        <div>
                            <panel.heading>Address</panel.heading>
                            <panel.body>{this.state.address}</panel.body>
                            <panel.heading>Email</panel.heading>
                            <panel.body>{this.state.email}</panel.body>
                            <panel.heading>Username of "Owner"</panel.heading>
                            <panel.body>{this.state.username}</panel.body>
                            <panel.heading>Description</panel.heading>
                            <panel.body>{this.state.description}</panel.body>
                        </div>

                    </Col>
                    <Col size="md-6 sm-12">
                        <Jumbotron>
                            <h1>Blogs about this Business</h1>
                        </Jumbotron>
                        {this.state.blogs.length ? (
                            <ListGroupItem>
                                {this.state.blogs.map(blog => (
                                    <ListGroupItem key={blog._id} href={"/blogs/" + blogId}>

                                        <strong>
                                            {blog.title} by {blog.username}
                                        </strong>
                                        <div>
                                            {blog.body}
                    </ListGroupItem>


          </Col>
        </Row>
      </Container>
                        );
                        }
                      }

                      <Grid>
  <Row>
    <Col xs={6} md={4}>
      <Image src="/thumbnail.png" rounded />
    </Col>
    </Grid>
                      
export default profile;