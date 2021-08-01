import React, {Component} from "react";
import {Button,Card,CardHeader,CardBody,FormGroup,Form,Input,Row,Col,} from "reactstrap";
import PanelHeader from "components/PanelHeader/PanelHeader.js";
import api from '../api/index'
import fs from 'fs'

class User extends Component{
  state={
    file:'',
    Hotel_Name:'',
    Slogan:'',
    Phone_Number:'',
    Address:'',
    _id:''
  }

  componentDidMount(){
    api.get('get_details').then(res=>{
      this.setState(res.data?.user[0])
    })
  }

  handleChange=(e)=>{
    e.preventDefault();
    this.setState({[e.target.name]:e.target.value})
  }

  fileChange=(e)=>{
    debugger
    console.log(e.target.files[0].name)
    this.setState({file: e.target.files })
  }

  handleSubmit=(e)=>{
    e.preventDefault();
    const formData = new FormData();
    formData.append("Hotel_Name", this.state.Hotel_Name);
    formData.append("file",this.state.file);
    formData.append("Slogan", this.state.Slogan);
    formData.append("Phone_Number", this.state.Phone_Number);
    formData.append("Address", this.state.Address);

    api.post('add_details', formData).then(res=>{
      console.log(res.data);
    }).catch(err=>{
      console.log(err)
    })
  }

  render() {
    return (
      <>
        <PanelHeader size="sm" />
        <div className="content">
          <Row>
            <Col md="8">
              <Card>
                <CardHeader>
                  <h5 className="title">Edit Profile</h5>
                </CardHeader>
                <CardBody>
                  <Form onSubmit={this.handleSubmit}>
                    <Row>
                      <Col  md="6">
                        <FormGroup>
                          <label>Hotel Name</label>
                          <Input defaultValue={this.state.Hotel_Name} name='Hotel_Name' onChange={this.handleChange} placeholder="Hotel name" type="text"/>
                        </FormGroup>
                      </Col>
                      <Col  md="6">
                        <FormGroup>
                          <label>Phone number</label>
                          <Input defaultValue={this.state.Phone_Number} name='Phone_Number' onChange={this.handleChange} placeholder="Phone number" type="number" />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="12">
                        <FormGroup>
                          <label>Address</label>
                          <Input defaultValue={this.state.Address} name='Address' onChange={this.handleChange} placeholder="Hotel Address" type="text"/>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="12">
                        <FormGroup>
                          <label>Slogan</label>
                          <Input defaultValue={this.state.Slogan} name='Slogan' onChange={this.handleChange} placeholder="Slogan" type="text"/>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pr-1" md="6">
                        <label>Hotel Logo</label>
                        <Input name='file' onChange={this.fileChange} type="file"/>
                      </Col>
                      <Col  md="6">
                        <FormGroup>
                          <Input type="submit" value='submit' className='btn btn-info bg-info text-white'/>
                        </FormGroup>
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
              </Card>
            </Col>
            <Col md="4">
              <Card className="card-user">
                <div className="image bg-warning"></div>
                <CardBody>
                  <div className="author">
                    <a>
                      <img alt="..." className="avatar border-gray" src={require("assets/img/mike.jpg").default}/>
                      <h5 className="title text-warning">{this.state.Hotel_Name}</h5>
                    </a>
                    <p className="description">{this.state.Phone_Number}</p>
                  </div>
                  {this.state.Slogan && <p className="description text-center pl-4 pr-4"> &quot;{this.state.Slogan}&quot; </p>}
                </CardBody>
                <hr />
                <div className="button-container">
                  <p className="description text-left pl-5 pr-5"> {this.state.Address} </p>
                </div>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default User;
