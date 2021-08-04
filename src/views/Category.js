import React, {useState,useEffect } from "react";
import Switch from '@material-ui/core/Switch';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import {Card,CardBody,CardHeader,CardFooter,CardTitle,Row,Col,UncontrolledDropdown, Input} from "reactstrap";
import PanelHeader from "components/PanelHeader/PanelHeader.js";
import api from '../api/index'
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

function Category() {
  const classes = useStyles();
  const [name, setName] = useState('');
  const [uName, setUname] = useState('');
  const [open, setOpen] = React.useState(false);
  const [newopen, setNewopen] = React.useState(false);
  const [isEnable, setIsenable] = useState(false);
  const [category, setCategory] = useState([]);
  const [isActive, setIsactive] = useState(false);
  const [id, setId] = useState('');
  const handleEdit = (data) => {
    setUname(data.Add_category);
    setId(data._id);
    setOpen(true)
  }

  const handleActive = (e,id)=>{
    setIsactive(true)
    const formData = new FormData();
    formData.append('Enable_disable',e.target.checked);
    api.post('enable_category/'+id, formData).then(res=>{
      setIsactive(false)
      getallCategory();
    }).catch(err=>{
      console.log(err)
      setIsactive(false)
    })
  }

  useEffect(() => {
    getallCategory();
  },[]);

  const getallCategory = () => {
    setIsactive(true)
    api.get('get_menu').then(res=>{
      setIsactive(false)
      setCategory(res.data?.user);
    }).catch(err=>{
      setIsactive(false)
      console.log(err)
    })
  }

  const addCategory = () => {
    const formData = new FormData();
    formData.append("Add_category", name);
    if(name!=null || name!= ''){
      setIsactive(true)
      api.post('/add_category', formData).then(res=>{
        console.log(res);
        setNewopen(false)
        setName('')
        setIsactive(false)
        getallCategory();
      }).catch(err=>{
        console.log(err)
        setIsactive(false)
      })
    }
  }
  const handleUpdate = () => {
    const formData = new FormData()
    formData.append('Add_category', uName);
    setIsactive(true)
    api.post('update_menu/'+id,formData).then(res=>{
      setOpen(false)
      getallCategory();
      setIsactive(false)
    }).catch(err=>{
      console.log(err)
      setIsactive(false)
    })
  }

  const handleDelete = (id) =>{
    setIsactive(true)
    api.delete('delete_menu/'+id).then(res=>{
      getallCategory();
      setIsactive(false)
    }).catch(err=>{
      console.log(err)
      setIsactive(false)
    })
  }
  return (
    <>
      <LoadingOverlay active={isActive} spinner text='Please wait...'>
      <PanelHeader size="sm"/>
      <div className="content">
        <Row>
          <Col xs={12} md={12}>
            <Card className="card-chart">
              <CardHeader>
                <h5 className="card-category">Categories</h5>
                <CardTitle tag="h4">Categories List</CardTitle>
                <UncontrolledDropdown>
                  <button className='btn-round btn-sm btn-outline-default btn-icon' onClick={()=>setNewopen(true)}>
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
                      <th className='text-center' scope="col">Action</th>
                      <th className='text-center' scope="col">Edit</th>
                      <th className='text-center' scope="col">Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* {isAdd &&<tr>
                      <td></td>
                      <td className='text-center'><Input type='text' placeholder="Name" onChange={(e)=>setName(e.target.value)}/></td>
                      <td className='text-center'><Switch checked={isEnable} color="primary" onChange={(e)=>setIsenable(!isEnable)}/></td>
                      <td className='text-center'><button className='btn-round btn-sm btn-outline-default' onClick={addCategory}> Add </button></td>
                    </tr>} */}
                    {category?.map((data,index)=>
                      <tr>
                        <td className='text-center'>{index+1}</td>
                        <td className='text-center'>{data.Add_category}</td>
                        <td className='text-center'><Switch checked={data.Enable_disable} onChange={(e)=>handleActive(e,data._id)}/></td>
                        <td className='text-center text-success'><i class="fas fa-edit" onClick={()=>handleEdit(data)}/></td>
                        <td className='text-center text-danger' onClick={()=>handleDelete(data._id)}><fa-icon class="fas fa-trash" color='red'/></td>
                      </tr>)}
                  </tbody>
                </table>
                </div>
              </CardBody>
              <CardFooter>
                
              </CardFooter>
            </Card>
          </Col>

        </Row>

        <Modal
        className={classes.modal}
        open={open}
        onClose={()=>setOpen(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
      >
        <Fade in={open} className={classes.paper}>
          <div>
            <h3 >Edit Category</h3>
            <label>Category Name</label>
             <Input type='text' defaultValue={uName} onChange={(e)=>setUname(e.target.value)}/>
             <button className='btn btn-sm btn-info' onClick={handleUpdate}>update</button>
          </div>
        </Fade>
      </Modal>

      <Modal
        className={classes.modal}
        open={newopen}
        onClose={()=>setNewopen(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
      >
        <Fade in={newopen} className={classes.paper}>
          <div>
            <h3 >Create Category</h3>
            <label>Category Name</label>
            <Input type='text' placeholder="Name" onChange={(e)=>setName(e.target.value)}/>
            <button className='btn btn-sm btn-info' onClick={addCategory}> Add </button>
          </div>
        </Fade>
      </Modal>
      </div>
      </LoadingOverlay>
    </>
  );
}

export default Category;
