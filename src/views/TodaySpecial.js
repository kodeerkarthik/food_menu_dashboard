import React, {useState,useEffect } from "react";
import Switch from '@material-ui/core/Switch';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import {Card,CardBody,CardHeader,CardTitle,Row,Col,UncontrolledDropdown} from "reactstrap";
import PanelHeader from "components/PanelHeader/PanelHeader.js";
import api from '../api/index'
import EditSplItems from "./EditSplItems";
import LoadingOverlay from 'react-loading-overlay';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function TodaySpecial() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [items, setItems]= useState([]);
  const [temp, setTemp] = useState('');
  const [editId, setEditId]= useState('')
  const [isActive, setIsactive] = useState(false);

  useEffect(() => {
    getsplItems();
  },[temp]);

  const getsplItems = () => {
    setIsactive(true)
    api.get('/get_today_special').then(res=>{
      setItems(res.data?.user);
      setIsactive(false)
    }).catch(err=>{
      console.log(err)
      setIsactive(false)
    })
  }

  const handleEdit = (data) => {
    setEditId(data._id)
    setOpen(true)
  }

  const handleActive = (e,id)=>{
    setIsactive(true)
    const formData = new FormData();
    formData.append('Enable_disable',e.target.checked);
    api.post('enable_today_special/'+id, formData).then(res=>{
      setIsactive(false)
      getsplItems();
    }).catch(err=>{
      console.log(err)
      setIsactive(false)
    })
  }

  const handleDelete = (id) => {
    setIsactive(true)
    api.delete('delete_today_special/'+id).then(res=>{
      getsplItems();
      setIsactive(false)
    }).catch(err=>{
      console.log(err)
      setIsactive(false)
    })
  }

  return (
    <LoadingOverlay active={isActive} spinner text='Please wait...'>
      <PanelHeader size="sm" />
      <div className="content">
        <Row>
          <Col md={12}>
          <Card className="card-chart">
              <CardHeader>
                <h5 className="card-category">Today's Special</h5>
                <CardTitle tag="h4">Today's Special List</CardTitle>
                <UncontrolledDropdown>
                  <button className='btn-round btn-sm btn-outline-default btn-icon' onClick={()=>setOpen(!open)}>
                     <i className="now-ui-icons ui-1_simple-add" /> Add new
                  </button>
                </UncontrolledDropdown>
              </CardHeader>
              <CardBody>
              <div className='table-responsive'>
                <table class="table">
                  <thead>
                    <tr>
                      <th className='text-center' scope="col">#</th>
                      <th className='text-center' scope="col">Name</th>
                      <th className='text-center' scope="col">Description</th>
                      <th className='text-center' scope="col">Price</th>
                      {/* <th className='text-center' scope="col">Image</th> */}
                      <th className='text-center' scope="col">Category</th>
                      <th className='text-center' scope="col">Veg</th>
                      <th className='text-center' scope="col">Enable/disable</th>
                      <th className='text-center' scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((data,index)=>
                      <tr>
                        <td className='text-center'>{index+1}</td>
                        <td className='text-center'>{data.Add_items}</td>
                        <td className='text-center'>{data.Item_description}</td>
                        <td className='text-center'>{data.Items_price}</td>
                        {/* <td className='text-center'><img alt="..." style={{width :'100px',height:'100px'}} src={data.Items_Img}/></td> */}
                        <td className='text-center'>{data.Category}</td>
                        <td className='text-center'><Switch color='primary' checked={data.radio1}/></td>
                        <td className='text-center'><Switch checked={data.Enable_disable} onChange={(e)=>handleActive(e,data._id)}/></td>
                        <td >              
                          <i class="fas fa-edit text-info" onClick={()=>handleEdit(data)}/>
                          <i class="fas fa-trash text-danger float-right" color='red' onClick={()=>handleDelete(data._id)}/>
                        </td>
                      </tr>)}
                  </tbody>
                </table>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Modal
          className={classes.modal}
          open={open}
          onClose={()=>{setOpen(false) 
            setEditId('')}}
          closeAfterTransition
          BackdropComponent={Backdrop}
        >
          <Fade in={open} className={classes.paper}>
            <div>
              <EditSplItems id={editId} reset={getsplItems} close={setOpen}/>
            </div>
          </Fade>
        </Modal>
      </div>
    </LoadingOverlay>
  );
}

export default TodaySpecial;
