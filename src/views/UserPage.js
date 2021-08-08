import React, {Component} from "react";
import {Button,Card,CardHeader,CardBody,FormGroup,Form,Input,Row,Col,} from "reactstrap";
import PanelHeader from "components/PanelHeader/PanelHeader.js";
import api from '../api/index'
import LoadingOverlay from 'react-loading-overlay';

class User extends Component{
  state={
    file:'',
    Hotel_Name:'',
    Slogan:'',
    Phone_Number:'',
    Address:'',
    Hotel_Logo:'',
    _id:'',
    count:0,
    isActive:false
  }

  componentDidMount(){
    this.getUserdetails();
    
  }
  getUserdetails=()=>{
    this.setState({isActive:true})
    api.get('get_details').then(res=>{ 
      this.setState(res.data?.user[0])
      this.setState({count:res.data?.user?.length})
      this.setState({isActive:false})
    }).catch(err=>{
      console.log(err)
      this.setState({isActive:false})
    })
  }

  handleChange=(e)=>{
    e.preventDefault();
    this.setState({[e.target.name]:e.target.value})
  }

  fileChange=(e)=>{
    this.setState({file: e.target.files[0] })
  }

  handleSubmit=(e)=>{
    e.preventDefault();
    this.setState({isActive:true})
    const formData = new FormData();
    formData.append("Hotel_Name", this.state.Hotel_Name);
    formData.append("file",this.state.file);
    formData.append("Slogan", this.state.Slogan);
    formData.append("Phone_Number", this.state.Phone_Number);
    formData.append("Address", this.state.Address);

    api.post('add_details', formData).then(res=>{
      console.log(res.data);
      this.getUserdetails();
      this.setState({isActive:false})
    }).catch(err=>{
      console.log(err)
      this.setState({isActive:false})
    })
  }

  render() {
    return (
      <>
      	<LoadingOverlay active={this.state.isActive} spinner text='Please wait...'>
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
                          <Input disabled={this.state.count>0} defaultValue={this.state.Hotel_Name} name='Hotel_Name' onChange={this.handleChange} placeholder="Hotel name" type="text"/>
                        </FormGroup>
                      </Col>
                      <Col  md="6">
                        <FormGroup>
                          <label>Phone number</label>
                          <Input disabled={this.state.count>0} defaultValue={this.state.Phone_Number} name='Phone_Number' onChange={this.handleChange} placeholder="Phone number" type="number" />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="12">
                        <FormGroup>
                          <label>Address</label>
                          <Input disabled={this.state.count>0} defaultValue={this.state.Address} name='Address' onChange={this.handleChange} placeholder="Hotel Address" type="text"/>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="12">
                        <FormGroup>
                          <label>Slogan</label>
                          <Input disabled={this.state.count>0} defaultValue={this.state.Slogan} name='Slogan' onChange={this.handleChange} placeholder="Slogan" type="text"/>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pr-1" md="6">
                        <label>Hotel Logo</label>
                        <Input disabled={this.state.count>0} name='file' onChange={this.fileChange} type="file"/>
                      </Col>
                      <Col  md="6">
                        <FormGroup>
                          {this.state.count==0 &&<Input type="submit" value='submit' className='btn btn-info bg-info text-white'/>}
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
                    <>
                      {this.state.Hotel_Logo==''? <img alt="Logo" className="avatar border-gray" src="https://belmontbec.com/wp-content/themes/oldnevia2/images/shop-01.jpg"/> :
                      <img alt="Logo" className="avatar border-gray mb-5" src={this.state.Hotel_Logo}/>}
                      {this.state.Hotel_Logo==''?<h5 className="title text-warning">{this.state.Hotel_Name}</h5>:
                      <h5 className="title text-warning mt-5">{this.state.Hotel_Name}</h5>}
                    </>
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
        </LoadingOverlay>
      </>
    );
  }
}

export default User;
