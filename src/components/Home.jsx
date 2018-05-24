import React from 'react'
import { Grid, Col, Row, Jumbotron } from 'react-bootstrap';
// TODO - add proptypes

const Home = props => {
	var jumbo = null;
	if (props.user) {
		jumbo = (
			<Jumbotron>
				<h1>Hello, {props.user.firstName}</h1>
				<code>
					{JSON.stringify(props)}
				</code>
			</Jumbotron>
		)
	} else {
		jumbo = (
			<Jumbotron>
				<h1>Hello, Please Login</h1>
			</Jumbotron>
		)
	}

	return (<Grid>
		<Row>
			<Col size="col-md-12">
				{jumbo}
			</Col></Row>
	</Grid>);
}

export default Home
