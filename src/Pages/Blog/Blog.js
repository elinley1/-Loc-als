// import React, { Component } from "react";
// import { Col, Row, Container } from "../../Grid";
// import { Input, TextArea, FormBtn } from "../../Form";

import React, { Component } from "react";

import Jumbotron from "../../components/Jumbotron";
import API from "/../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn } from "../../components/Form";


class Blog extends Component {
    
    
    render() {
        return (
            <Container>
                <Row>
                    <Col size="md-6">
                        <form>
                            <Input
                                // value={this.state.title}
                                // onChange={}
                                name="title"
                                placeholder="Business Name (required)"
                            />
                            <Input
                                // value={this.state.Author}
                                // onChange={}
                                name="author"
                                placeholder="Author (required)"
                            />
                            <Input
                                // value={this.state.image}
                                // onChange={}
                                name="images"
                                type="file" 
                                className="btn btn-outline-primary waves-effect" 
                                accept=".jpg, .jpeg, .png"
                            />
                            <TextArea
                                // value={this.state.post}
                                // onChange={}
                                name="Body"
                                placeholder="Post "
                            />
                            <FormBtn>
                                Submit Blog
                            </FormBtn>
                        </form>
                    </Col>
                </Row>
            </Container>
        );
    };
};

export default Blog;