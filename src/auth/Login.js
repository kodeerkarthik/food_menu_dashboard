import PanelHeader from 'components/PanelHeader/PanelHeader';
import React, { Component } from 'react';
import {Card,CardBody,CardHeader,CardFooter,CardTitle,Row,Col,Form,FormGroup, Input} from "reactstrap";
import './auth.css';
import LoadingOverlay from 'react-loading-overlay';
import api from '../api/index'
import history from '../api/history'

class Login extends Component {
	constructor(props){
		super(props);
		this.state={
			email:'',
			password:'',
			isActive:false
		}
	}

	login = (e) => {
		e.preventDefault();
		this.setState({isActive:true})
		api.post('Signin', this.state).then(res=>{
			sessionStorage.setItem('token',res.data?.token)
			sessionStorage.setItem('userId',res.data?.userId)
			history.push('/admin/user-page')
			this.setState({isActive:false})
		}).catch(err=>{
			console.log(err)
			this.setState({isActive:false})
		})
	}
	handleChange = (e) =>{
		this.setState({[e.target.name]:e.target.value})
	}
	render() {
		return (
			<>
			<LoadingOverlay active={this.state.isActive} spinner text='Please wait...'>
				<PanelHeader size="sm"/>
				{/* <div className="content "> */}
					<Row className='m-0'>
						<Col xs={12} md={3}></Col>
						<Col xs={12} md={6}>
							<Card className="card-chart auth_body">	
								<CardHeader>
									<CardTitle className='text-center' tag="h3">Log in</CardTitle>
								</CardHeader>
								<CardBody>
									<Form onSubmit={this.login}>
										<FormGroup>
											<label>Email :</label>
											<Input name='email' onChange={this.handleChange} placeholder="Email" type="email"/>
										</FormGroup>
										<FormGroup>
											<label>Password :</label>
											<Input name='password' onChange={this.handleChange} placeholder="Password" type="password"/>
										</FormGroup>
										<FormGroup>
											<Input type="submit" value='Login' className='btn btn-info bg-info text-white'/>
											{/* <h6 className='text-center'> Click Here to <Link to="/register">Register</Link></h6> */}
										</FormGroup>
									</Form>
								</CardBody>
							</Card>					
						</Col>
					</Row>
				</LoadingOverlay>
			</>
		);
	}
}

export default Login;
