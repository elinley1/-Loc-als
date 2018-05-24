import React, { Component } from 'react'
import {FormControl, FormGroup, ControlLabel, HelpBlock, Checkbox, Radio, Button} from 'react-bootstrap';
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import { Col, Row, Grid } from "react-bootstrap";
import { Input, TextArea, FormBtn } from "../components/Form";

class UserProfile extends Component {
    constructor () {
        super()
        this.state = {
            local = this.state.local,
            firstName = this.state.name,
            lastName = this.state.name,
            email = this.state.email,
            cityDuration = this.state.cityDuration,
            address= this.state.address,
            businesses = [this.state.business]
        }
        this.handleSearch = this.handleSearch.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    handle

    handleSearch(event) {
        event.preventDefault()
        axios.get('api/v1/Business?query={"city":{"$regex":"^({this.state.city})"}}')
        .then(response => {
            console.log(response)
            if (!response.data.errmsg) {
                console.log('businesses found')
                this.setState({
                    business: []
                })
            } else {
                console.log('none found')
            }
        })
    }

    render() {
        if (this.state.re
		return (
			<Grid>
				<h1>Hello, {this.user.firstName}! </h1>
                <Row>
                    <Col size="col-md-12">
                        <div>
                    </Col>
                </Row>
            </Grid>         
    }
}