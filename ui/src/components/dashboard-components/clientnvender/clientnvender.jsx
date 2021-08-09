import React , { Component ,useState,useEffect  } from "react";
import Checkbox from '@material-ui/core/Checkbox';
import UnCheckedIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckedIcon from '@material-ui/icons/CheckBox'
import { Alert,Form,FormGroup,Label,Input,TabContent, TabPane, Nav, NavItem, NavLink, Card, CardTitle, CardText, Row, Col, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Link, useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import axios from "axios";
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
    Button
 } from '@material-ui/core';
import { useForm } from "react-hook-form";

import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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

const Clientnvender = () => {
  const classes = useStyles();
  const history = useHistory();
  const username = localStorage.getItem('userName');
  const userId = localStorage.getItem('userid');

    return (
       <>  <div className="myaccount">
            
      
       <TableContainer component={Paper} className={classes.tableContainer}>
       <Row>
  
      
  <Col sm="2" className="text-left">
   <p className="profilehead">{username}</p>
    
    </Col>
    
    <Col sm="10" className="text-right">

    <Link  to={{
    pathname: `/addvendor`,
    state: { test : 'testing'}
}} className="myacedit margin-right-15">
         Add Vendor
         </Link>

<Button  type="submit" className="myacaprv margin-right-15">
         Active
         </Button>


         <Button  type="submit" className="myacrjct margin-right-15">
          Inactive
         </Button>

         <Button  type="submit" className="myacedit margin-right-15">
          Approve
         </Button>

        
       </Col>
    </Row>
         <Table className={classes.table} aria-label="simple table">

           <TableBody className="clientTable">
         

           <TableRow key="gh"  className="spacer">
          

                   <TableCell className="chkp tdbackf">
            <Label check>
          <Checkbox type="checkbox"
         
          uncheckedIcon={<UnCheckedIcon style={{fill: "red"}} />}
          checkedIcon={<CheckedIcon style={{fill: "#0D3E69"}} />}
          />{' '}
         
        </Label>
                    </TableCell>
                 <TableCell className="">
                    <p className="margin-b-0"> <label className="tdlabel margin-b-0">Name: </label><span className="tdspan">Name</span></p>
         
           <p className="margin-b-0"> <label className="tdlabel margin-b-0">PAN No: </label><span className="tdspan">{"contact"}</span></p>
                   </TableCell>

                   <TableCell className="">
                    <p className="margin-b-0"> <label className="tdlabel margin-b-0">GST IN: </label><span className="tdspan">6565656</span></p>
         
           <p className="margin-b-0"> <label className="tdlabel margin-b-0">Internal Reffrence No: </label><span className="tdspan">{"contact"}</span></p>
                   </TableCell>

                   <TableCell className="">
                    <p className="margin-b-0"> <label className="tdlabel margin-b-0">Bank Name: </label><span className="tdspan">Name</span></p>
         
         
                   </TableCell>
                
                 <TableCell><Button  type="submit" className="profilebtntabel margin-right-15">
         Approved
         </Button></TableCell>
                
                   
               </TableRow>
           
           
   
   
   
   
           </TableBody>
          <TableFooter>
            {/* <TablePagination className={classes.footCls}
               rowsPerPageOptions={[10, 15]}
               component="div"
               count={ALLUSERS.length}
               rowsPerPage={rowsPerPage}
               page={page}
               onChangePage={handleChangePage}
               onChangeRowsPerPage={handleChangeRowsPerPage}
           /> */}
           </TableFooter>
         </Table>
       </TableContainer>
        
        </div></>
    );
}



export default Clientnvender;
