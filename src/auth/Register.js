import React, { Component } from 'react';
import PanelHeader from 'components/PanelHeader/PanelHeader';
import {Card,CardBody,CardHeader,CardFooter,CardTitle,Row,Col,Form,FormGroup, Input} from "reactstrap";
import './auth.css';
import { Link } from "react-router-dom";

class Register extends Component {
	constructor(props){
		super(props);
		this.state={
			email:'',
			password:'',
			confirmpassword:''
		}
	}

	register = (e) => {
		console.log(this.state);
	}
	handleChange = (e) =>{
		this.setState({[e.target.name]:e.target.value})
	}
	render() {
		return (
			<>
				<PanelHeader size="sm"/>
				{/* <div className="content "> */}
					<Row className='m-0'>
						<Col xs={12} md={3}></Col>
						<Col xs={12} md={6}>
							<Card className="card-chart auth_body">	
								<CardHeader>
									<CardTitle className='text-center' tag="h3">Register</CardTitle>
								</CardHeader>
								<CardBody>
									<Form onSubmit={this.register}>
										<FormGroup>
											<label>Email :</label>
											<Input name='email' onChange={this.handleChange} placeholder="Email" type="email"/>
										</FormGroup>
										<FormGroup>
											<label>Password :</label>
											<Input name='password' onChange={this.handleChange} placeholder="Password" type="password"/>
										</FormGroup>
										<FormGroup>
											<label> Confirm Password :</label>
											<Input name='confirmpassword' onChange={this.handleChange} placeholder="Confirm Password" type="password"/>
										</FormGroup>
										<FormGroup>
											<Input type="submit" value='Register' className='btn btn-info bg-info text-white'/>
											<h6 className='text-center'> If you already have an account? <Link to="/login">Login</Link></h6>
										</FormGroup>
									</Form>
								</CardBody>
							</Card>					
						</Col>
					</Row>
				{/* </div> */}
			</>
		);
	}
}

export default Register;
