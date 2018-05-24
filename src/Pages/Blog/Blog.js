import React, { Component } from "react";
import { Col, Row, Container } from "../../components/Grid";
import { Input, TextArea, FormBtn, Select } from "../../components/Form";


class Blog extends Component {
    state = {
        title: "",
        body: "",
        rating: "",
        images:""
    };

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
          [name]: value
        });
    };

    componentDidMount() {
        
    };

    handleFormSubmit = event => {
        event.preventDefault();
        
    };
    
    render() {
        return (
            <Container>
                <Row>
                    <Col size="md-6">
                        <h2>Rate and Review {this.state.busName}</h2>
                        <form>
                            <Select value={this.state.rating} name="rating" size="1" onChange={this.handleInputChange} >
                                <option selected>Rating</option>
                                <option value="1">1 star</option>
                                <option value="2">2 stars</option>
                                <option value="3">3 stars</option>
                                <option value="4">4 stars</option>
                                <option value="5">5 stars</option>
                            </Select>
                            <Input
                                value={this.state.title}
                                onChange={this.handleInputChange}
                                name="title"
                                placeholder="Review Title (required)"
                            />
                            <TextArea
                                value={this.state.body}
                                onChange={this.handleInputChange}
                                name="Body"
                                placeholder="Post Review"
                            />
                            <Input
                                value={this.state.image}
                                onChange={this.handleInputChange}
                                name="images"
                                type="file" 
                                className="btn btn-outline-primary waves-effect" 
                                accept=".jpg, .jpeg, .png"
                            />
                            <FormBtn
                                disabled={!(this.state.rating && this.state.title)} 
                                onClick={this.handleFormSubmit}>
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