import React , { Component ,useState,useEffect  } from "react";
import Checkbox from '@material-ui/core/Checkbox';

import { Alert,Form,FormGroup,Label,Input,TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col, Dropdown, DropdownToggle, DropdownMenu, DropdownItem,Modal,ModalHeader,ModalBody,ModalFooter } from 'reactstrap';

import FloatingLabelInput from 'react-floating-label-input';
import { Link, useHistory } from "react-router-dom";

import axios from "axios";
import { useForm } from "react-hook-form";

import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { makeStyles } from '@material-ui/core/styles';


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { 
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Grid,
  Typography,
  TablePagination,
  TableFooter,

} from '@material-ui/core';
const  token =localStorage.getItem('token')? localStorage.getItem('token') : '';
const  userid =localStorage.getItem('userid')? localStorage.getItem('userid') : '';

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
    borderCollapse: 'separate',
   backgroundColor:'rgb(221,222,222)',
      borderSpacing:'0 15px',
  },


  tableContainer: {
      // borderRadius: 15,
      // margin: '10px 10px',
      // maxWidth: 950,
      // backgroundColor: '#ccc',
      backgroundColor: 'rgb(221,222,222)',
  padding: '15px',
  borderRadius: '15px',
     
  },
  tableHeaderCell: {
      fontWeight: '200',
      backgroundColor: '#0D3E69',
      color: theme.palette.getContrastText(theme.palette.primary.dark),
      padding: '6px',
      fontSize:'11px',
  },
  tableRow: {
   
    borderCollapse: 'separate',
 
    borderSpacing:'0 15px',
},
  tableCell: {
    fontWeight: '200',
    // backgroundColor: 'red',
    color: '#A5A5A5',
    // padding:0,
   fontSize:'10px',
   
},
  avatar: {
      backgroundColor: theme.palette.primary.light,
      color: theme.palette.getContrastText(theme.palette.primary.light)
  },
  name: {
       
      // color: theme.palette.secondary.dark
  },
  status: {
      fontWeight: 'bold',
      fontSize: '0.75rem',
      color: 'white',
      backgroundColor: 'grey',
      borderRadius: 8,
      padding: '3px 10px',
      display: 'inline-block'
  },
  footCls:
  {
overflow:'inherit'
  }
}));

  //class Myprofile extends Component {

const uploadraiseinvoice = () => {
  const classes = useStyles();


   // Search
   const [Wamt, setWamt] = useState("");

   const [modal, setModal] = useState(false);
   const [backdrop, setBackdrop] = useState(true);
   
   const toggle = () => setModal(!modal);
    return (
       <> 
        <div className=" with-space">
       <Row>
   
       
   <Col sm="4" className="">
       <div className="uploadinvoice">
        <Form >
        <div className=" with-space">

        <Row>
   
       
<Col sm="12" className="text-left">
  <p className="profilehead">Bulk Upload Invoices</p>
  
  </Col></Row>

  <Row>
   
       
   <Col sm="12" className="text-left ">
  
<Button  type="submit" className="btndonsample margin-right-15">
            Download Sample File
             </Button>
   
</Col></Row>
   
             <Row>
   
       
   <Col sm="12" className="text-center thentext">
     <span className="">Then</span>
     
     </Col></Row>
  
<Row>
   
       
   <Col sm="12" className="text-left">

       
   
   <input
  accept="image/*"
  className={classes.input}
  style={{ display: 'none' }}
  id="raised-button-file"
  multiple
  type="file"
/>
<label htmlFor="raised-button-file" class="raised-button-file">
  <Button variant="raised" component="span" className="chsfilebtn">
    Choose File
  </Button>
</label>
   
   
   </Col></Row>

             <Row>
   
       
   <Col sm="12" className="text-left">
   
             <Button  type="submit" className="uploadbtn margin-right-15">
             Upload File
             </Button>
   
         
           
  
  </Col>
  
  
  </Row>

        
  </div></Form></div>
  
  
  </Col>
      
  <Col sm="8" className="">
       <div className="uploadinvoice">
        <Form >
        <div className=" with-space">

        <Row>
   
       
<Col sm="12" className="text-left">
  <p className="profilehead">Raise Invoice</p>
  
  </Col></Row>








  <Row form>
        <Col md={6}>

    
        <FormGroup className=" input-spacing inputouter ">
        <FloatingLabelInput
      id="cname"
      label="Corporate"
     
      // {...register("accountName", { value: accountName })}  
      // onChange={(e) => setaccountName(e.target.value)} 
     
      
    
    />
              {/* {errors.accountName ? <p class="text-danger padd-l-r-10 margin-b-0">{errors.accountName.message}</p> : '' } */}

         
        </FormGroup></Col>
        <Col md={6}>
        <FormGroup className=" input-spacing inputouter">
        <FloatingLabelInput
      id="pdno"
      label="PD No."
    //   {...register("pan", { value: panName })}  onChange={(e) => setpanName(e.target.value)}  value={panName}
    />
                  {/* {errors.pan ? <p class="text-danger padd-l-r-10 margin-b-0">{errors.pan.message}</p> : '' } */}

         
        </FormGroup></Col>
        </Row>




        <Row form>
        <Col md={6}>

    
        <FormGroup className=" input-spacing inputouter ">
        <FloatingLabelInput
      id="sstate"
      label="Source State"
     
      // {...register("accountName", { value: accountName })}  
      // onChange={(e) => setaccountName(e.target.value)} 
     
      
    
    />
              {/* {errors.accountName ? <p class="text-danger padd-l-r-10 margin-b-0">{errors.accountName.message}</p> : '' } */}

         
        </FormGroup></Col>
        <Col md={6}>
        <FormGroup className=" input-spacing inputouter">
        <FloatingLabelInput
      id="dstate"
      label="Destination State"
    //   {...register("pan", { value: panName })}  onChange={(e) => setpanName(e.target.value)}  value={panName}
    />
                  {/* {errors.pan ? <p class="text-danger padd-l-r-10 margin-b-0">{errors.pan.message}</p> : '' } */}

         
        </FormGroup></Col>
        </Row>


        
        <Row form>
        <Col md={6}>

    
        <FormGroup className=" input-spacing inputouter ">
        <FloatingLabelInput
      id="invno"
      label="Invoice Phone No."
     
      // {...register("accountName", { value: accountName })}  
      // onChange={(e) => setaccountName(e.target.value)} 
     
      
    
    />
              {/* {errors.accountName ? <p class="text-danger padd-l-r-10 margin-b-0">{errors.accountName.message}</p> : '' } */}

         
        </FormGroup></Col>
        <Col md={6}>
        <FormGroup className=" input-spacing inputouter">
        <FloatingLabelInput
      id="invdate"
      label="Invoice Date"
    //   {...register("pan", { value: panName })}  onChange={(e) => setpanName(e.target.value)}  value={panName}
    />
                  {/* {errors.pan ? <p class="text-danger padd-l-r-10 margin-b-0">{errors.pan.message}</p> : '' } */}

         
        </FormGroup></Col>
        </Row>









        <Row form>
        <Col md={6}>

    
        <FormGroup className=" input-spacing inputouter ">
        <FloatingLabelInput
      id="invamt"
      label="Invoice Amount"
     
      // {...register("accountName", { value: accountName })}  
      // onChange={(e) => setaccountName(e.target.value)} 
     
      
    
    />
              {/* {errors.accountName ? <p class="text-danger padd-l-r-10 margin-b-0">{errors.accountName.message}</p> : '' } */}

         
        </FormGroup></Col>
        <Col md={6}>
        <FormGroup className=" input-spacing inputouter">
        <FloatingLabelInput
      id="desc"
      label="Description"
    //   {...register("pan", { value: panName })}  onChange={(e) => setpanName(e.target.value)}  value={panName}
    />
                  {/* {errors.pan ? <p class="text-danger padd-l-r-10 margin-b-0">{errors.pan.message}</p> : '' } */}

         
        </FormGroup></Col>
        </Row>




        <Row form>
        <Col md={6}>

    
        <FormGroup className=" input-spacing inputouter ">
        <FloatingLabelInput
      id="cgts"
      label="CGTS (9%)"
     
      // {...register("accountName", { value: accountName })}  
      // onChange={(e) => setaccountName(e.target.value)} 
     
      
    
    />
              {/* {errors.accountName ? <p class="text-danger padd-l-r-10 margin-b-0">{errors.accountName.message}</p> : '' } */}

         
        </FormGroup></Col>
        <Col md={6}>
        <FormGroup className=" input-spacing inputouter">
        <FloatingLabelInput
      id="sgts"
      label="SGTS (9%)"
    //   {...register("pan", { value: panName })}  onChange={(e) => setpanName(e.target.value)}  value={panName}
    />
                  {/* {errors.pan ? <p class="text-danger padd-l-r-10 margin-b-0">{errors.pan.message}</p> : '' } */}

         
        </FormGroup></Col>
        </Row>












        <Row form>
        <Col md={6}>

    
        <FormGroup className=" input-spacing inputouter ">
        <FloatingLabelInput
      id="igst"
      label="IGST"
     
      // {...register("accountName", { value: accountName })}  
      // onChange={(e) => setaccountName(e.target.value)} 
     
      
    
    />
              {/* {errors.accountName ? <p class="text-danger padd-l-r-10 margin-b-0">{errors.accountName.message}</p> : '' } */}

         
        </FormGroup></Col>
        <Col md={6}>
        <FormGroup className=" input-spacing inputouter">
        <FloatingLabelInput
      id="tds"
      label="TDS"
    //   {...register("pan", { value: panName })}  onChange={(e) => setpanName(e.target.value)}  value={panName}
    />
                  {/* {errors.pan ? <p class="text-danger padd-l-r-10 margin-b-0">{errors.pan.message}</p> : '' } */}

         
        </FormGroup></Col>
        </Row>










        <Row form>
        <Col md={6}>

    
        <FormGroup className=" input-spacing inputouter ">
        <FloatingLabelInput
      id="other"
      label="Other Factor / Adjustment"
     
      // {...register("accountName", { value: accountName })}  
      // onChange={(e) => setaccountName(e.target.value)} 
     
      
    
    />
              {/* {errors.accountName ? <p class="text-danger padd-l-r-10 margin-b-0">{errors.accountName.message}</p> : '' } */}

         
        </FormGroup></Col>
        <Col md={6}>
        <FormGroup className=" input-spacing inputouter">
        <FloatingLabelInput
      id="tamt"
      label="Token Amount"
    //   {...register("pan", { value: panName })}  onChange={(e) => setpanName(e.target.value)}  value={panName}
    />
                  {/* {errors.pan ? <p class="text-danger padd-l-r-10 margin-b-0">{errors.pan.message}</p> : '' } */}

         
        </FormGroup></Col>
        </Row>







        <Row>
   
       
   <Col sm="6" className="text-left">
   <Button  type="submit" className="profilebtn margin-right-15">
             Submit
             </Button>
   
   
           
             <Link   to={{
       pathname: "/raisedinvoice"}} className="profilebtncancel margin-right-15">
             Cancel
             </Link>
           </Col>
   </Row>
  </div></Form></div>
  
  
  </Col>
  
  
  </Row>
  </div>
       </>
    );
}



export default uploadraiseinvoice;
