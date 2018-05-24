import React, { Component } from "react";
import { Col, Row, Container } from "../../components/Grid";
import { Input, TextArea, FormBtn, Select } from "../../components/Form";
import axios from 'axios'
import { Redirect } from 'react-router-dom'

class Blog extends Component {
    constructor() {
		super()
		this.state = {
			title: '',
			body: '',
			rating: '',
			redirectTo: null
		}
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleChange = this.handleChange.bind(this)
	}
    
    handleChange(event) {
		this.setState({
			[event.target.name]: event.target.value
		})
	}

    
    handleSubmit = event => {
        event.preventDefault();
        const userId = window.sessionStorage.getItem("userId");
        axios.post('/api/v1/Blog', {
			title: this.state.title,
			body: this.state.body,
            rating: this.state.rating,
            author: userId
		}).then(response => {
            console.log(response)
            if (!response.data.errmsg) {
                console.log('blog submited')
                this.setState({
                    redirectTo: '/'
                })
            } else {
                console.log("err")
            }
        })
    };
    
    render() {
        if (this.state.redirectTo) {
			return <Redirect to={{ pathname: this.state.redirectTo }} />
        }
        
        return (
            <Container>
                <Row>
                    <Col size="md-6">
                        <h2>Rate and Review {this.state.busName}</h2>
                        <form>
                            <Select value={this.state.rating} name="rating" size="1" onChange={this.handleChange} type = "int"  >
                                <option selected>Rating</option>
                                <option value="1">1 star</option>
                                <option value="2">2 stars</option>
                                <option value="3">3 stars</option>
                                <option value="4">4 stars</option>
                                <option value="5">5 stars</option>
                            </Select>
                            <Input
                                value={this.state.title}
                                onChange={this.handleChange}
                                name="title"
                                placeholder="Review Title (required)"
                            />
                            <TextArea
                                value={this.state.body}
                                onChange={this.handleChange}
                                name="body"
                                placeholder="Post Review"
                            />
                            <FormBtn
                                disabled={!(this.state.rating && this.state.title)} 
                                onClick={this.handleSubmit}>
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