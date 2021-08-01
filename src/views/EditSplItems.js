import React, { Component } from 'react';
import { Input} from "reactstrap";
import {FormControl,FormControlLabel,InputLabel,Select,Switch, MenuItem} from '@material-ui/core';
import api from '../api/index'
import history from '../api/history'

class EditItems extends Component {
    constructor(props) {
        super(props);
        this.state={
            Add_items:'',
            Category:'',
            Item_description:'',
            Items_Img:'',
            Items_price:'',
            radio1:false,
            category:[],
            data:{}
        }
    }

    componentDidMount(){
        this.getallCategory();
        this.props?.id && this.getItemById(this.props?.id)
    }
    getItemById=(id)=>{
        api.get('get_single_today_special/'+id).then(res=>{
            this.setState(res.data)
        }).catch(err=>{

        })
    }
    getallCategory=()=>{
        api.get('/get_menu').then(res=>{
            this.setState({category:res.data?.user});
        }).catch(err=>{
            console.log(err)
        })
    }
    handleChange=(e)=>{
        this.setState({[e.target.name]:e.target.value})
    }
    handleSubmit=()=>{
        const formData = new FormData();
        formData.append("Add_items", this.state.Add_items);
        formData.append("Category", this.state.Category);
        formData.append("Item_description", this.state.Item_description);
        formData.append("Items_Img", this.state.Items_Img);
        formData.append("Items_price", this.state.Items_price);
        formData.append("radio1", this.state.radio1);
        api.post('/today_special', formData).then(res=>{
            this.props.reset();
            this.props.close(false)
          }).catch(err=>{
            console.log(err)
        })
    }
    handleUpdate=()=>{
        const formData = new FormData();
        formData.append("Add_items", this.state.Add_items);
        formData.append("Category", this.state.Category);
        formData.append("Item_description", this.state.Item_description);
        formData.append("Items_Img", this.state.Items_Img);
        formData.append("Items_price", this.state.Items_price);
        formData.append("radio1", this.state.radio1);
        api.post('/update_today_special/'+this.props?.id, formData).then(res=>{
            this.props.reset();
            this.props.close(false)
        }).catch(err=>{
            console.log(err)
        })
    }
    render() {
        return (
            <div>
                <Input type='text' className='mb-3'
                 name='Add_items' placeholder="Item name" value={this.state.Add_items}
                 onChange={this.handleChange}
                />
                <Input type='text' className='mb-3' 
                name='Item_description' placeholder="description" 
                onChange={this.handleChange} value={this.state.Item_description}
                />
                <Input type='number' className='mb-3' 
                name='Items_price' placeholder="Price" 
                onChange={this.handleChange} value={this.state.Items_price}
                />
                <FormControl className='mb-3 ' variant="outlined" 
                style={{minWidth:'100%'}}
                >
                    <InputLabel id="Category">Category</InputLabel>
                    <Select labelId="Category"  name='Category' value={this.state.Category}
                    style={{width:'100%'}} onChange={this.handleChange} 
                    >
                        {this.state.category.map((data,index)=>
                        <MenuItem value={data.Add_category}>{data.Add_category}</MenuItem>
                        )}
                    </Select>
                </FormControl>
                <br/>

                <FormControlLabel
                    control={<Switch checked={this.state.radio1} 
                    name='radio1' color="primary" 
                    onChange={(e)=>this.setState({radio1:e.target.checked})}/>                }
                    label="IsVeg?"
                />
                {this.props?.id && <br/>}
                {!this.props?.id && 
                <Input className='mb-3' type='file' name='Items_Img'  onChange={this.handleChange}/>}
                {this.props?.id?<button className='btn btn-sm btn-info' 
                onClick={this.handleUpdate}>Update</button>:
                <button className='btn btn-sm btn-info' onClick={this.handleSubmit}>Add</button>}
            </div>
        );
    }
}

export default EditItems;
