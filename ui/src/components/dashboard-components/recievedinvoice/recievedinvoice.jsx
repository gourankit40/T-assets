import React , { Component ,useState,useEffect  } from "react";
import Checkbox from '@material-ui/core/Checkbox';
import UnCheckedIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckedIcon from '@material-ui/icons/CheckBox'
import { Alert,Form,FormGroup,Label,Input,TabContent, TabPane, Nav, NavItem, NavLink, Card, CardTitle, CardText, Row, Col, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Modal,ModalHeader,ModalBody,ModalFooter } from 'reactstrap';

import FloatingLabelInput from 'react-floating-label-input';
import { Link, useHistory } from "react-router-dom";

import axios from "axios";
import { makeStyles } from '@material-ui/core/styles';

import { useForm } from "react-hook-form";

import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';


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
  Button
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

const recievedinvoice = () => {

  const classes = useStyles();
  
    // withdraw
    const [Wamt, setWamt] = useState("");

    const [modal, setModal] = useState(false);
    const [backdrop, setBackdrop] = useState(true);
    
    const toggle = () => setModal(!modal);
  
    return (
        
         <div className="myaccount">
            
      
            <TableContainer component={Paper} className={classes.tableContainer}>
            <Row>
       
           
       <Col sm="2" className="text-left">
        <p className="profilehead">Recieved Invoice</p>
         
         </Col>
         
         <Col sm="10" className="text-right toknrcv">
        
        

              

              <Button  type="submit" className="myacaprv margin-right-15" onClick={toggle}>
             Recieve Invoice
              </Button>
              <Button  type="submit" className="myacedit margin-right-15" >
              Pay 
              </Button>
              <Button  type="submit" className="myacedit margin-right-15" >
              Tokenise More
              </Button>
              
            
            </Col>
         </Row>
              <Table className={classes.table} aria-label="simple table">
    
              <TableHead className="mylinecell">
          <TableRow>
          <TableCell className="chkp">
            <Label check>
          <Checkbox type="checkbox"
         
          uncheckedIcon={<UnCheckedIcon style={{fill: "red"}} />}
          checkedIcon={<CheckedIcon style={{fill: "#0D3E69"}} />}
          />{' '}
         
        </Label>
                    </TableCell>
            <TableCell className={classes.tableHeaderCell}>Supplier Name</TableCell>
            <TableCell className={classes.tableHeaderCell}>PD No.</TableCell>

            <TableCell className={classes.tableHeaderCell}>Invoice No.</TableCell>
           
            <TableCell className={classes.tableHeaderCell}>Invoice Amount</TableCell>
            <TableCell className={classes.tableHeaderCell}>Invoice Date</TableCell>

            <TableCell className={classes.tableHeaderCell}>Token Requested</TableCell>


            <TableCell className={classes.tableHeaderCell}>Tenor </TableCell>
            <TableCell className={classes.tableHeaderCell}>Payment Date</TableCell>

            <TableCell className={classes.tableHeaderCell}>Cash Paid</TableCell>
           
            <TableCell className={classes.tableHeaderCell}>Token Paid</TableCell>
            <TableCell className={classes.tableHeaderCell}>Balance Payable</TableCell>

          </TableRow>
        </TableHead>



<TableBody>

<TableRow className="spacer mylinecol">
<TableCell className="chkp">
            <Label check>
          <Checkbox type="checkbox"
         
          uncheckedIcon={<UnCheckedIcon style={{fill: "red"}} />}
          checkedIcon={<CheckedIcon style={{fill: "#0D3E69"}} />}
          />{' '}
         
        </Label>
                    </TableCell>
              <TableCell>
                  <Grid container>
                      
                      <Grid item lg={10}>
                    S1 Pvt Ltd
                      </Grid>
                  </Grid>
                </TableCell>
             
             
              <TableCell>
                 11010
                </TableCell>
                <TableCell>
         2034
                </TableCell>
                 <TableCell>
               10,00,000
                 </TableCell>
                 
                 <TableCell>
                 1 June 2021
                 </TableCell>

                 <TableCell>19 Days</TableCell>

                 <TableCell>
                8,00,000
                 </TableCell>
                 

                 <TableCell>
                 30-july-2021
                 </TableCell>

                 <TableCell>
                2,00,000
                 </TableCell>
                 <TableCell>
                3,00,000
                 </TableCell>
                 
                 <TableCell>
                3,00,000
                 </TableCell>
                 
                
            </TableRow>
        
           

            <TableRow className="spacer mylinecol">
            <TableCell className="chkp">
            <Label check>
          <Checkbox type="checkbox"
         
          uncheckedIcon={<UnCheckedIcon style={{fill: "red"}} />}
          checkedIcon={<CheckedIcon style={{fill: "#0D3E69"}} />}
          />{' '}
         
        </Label>
                    </TableCell>
              <TableCell>
                  <Grid container>
                      
                      <Grid item lg={10}>
                    S1 Pvt Ltd
                      </Grid>
                  </Grid>
                </TableCell>
             
             
              <TableCell>
                 11010
                </TableCell>
                <TableCell>
         2034
                </TableCell>
                 <TableCell>
               10,00,000
                 </TableCell>
                 
                 <TableCell>
                 1 June 2021
                 </TableCell>

                 <TableCell>19 Days</TableCell>

                 <TableCell>
                8,00,000
                 </TableCell>
                 

                 <TableCell>
                 30-july-2021
                 </TableCell>

                 <TableCell>
                2,00,000
                 </TableCell>
                 <TableCell>
                3,00,000
                 </TableCell>
                 
                 <TableCell>
                3,00,000
                 </TableCell>
                 
                
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


            <Modal isOpen={modal}  centered= {true} toggle={toggle}  modalClassName="witdrawTokenM" contentClassName="witdrawTokenM"  size="lg" backdrop={backdrop} >
        {/* <ModalHeader toggle={toggle}>  <Row>
       
           
       <Col  className="text-left">
        <p className="profilehead">Withdraw Token</p>
         
         </Col>
         </Row>
         </ModalHeader> */}
        <ModalBody>
        <TableContainer component={Paper} className={classes.tableContainer}>
            <Row>
       
           
       <Col sm="3" className="text-left">
        <p className="profilehead">Recieve Invoice</p>
         
         </Col>
         
         <Col sm="9" className="text-right toknrcv">
         <Button  type="submit" className="myacedit margin-right-15" >
              Pay 
              </Button>
        

              <Button  type="submit" className="myacedit margin-right-15" >
              Add Token 
              </Button>

              <Button  type="submit" className="myacaprv margin-right-15" >
             Approve
              </Button>
              <Button  type="submit" className="myacedit margin-right-15" >
             Recieve
              </Button>
              <Button  type="submit" className="myacrjct margin-right-15" >
               Reject 
              </Button>
              
            
            </Col>
         </Row>
              <Table className={classes.table} aria-label="simple table">
    
              <TableHead className="mylinecell">
          <TableRow>
          <TableCell className="chkp">
            <Label check>
          <Checkbox type="checkbox"
         
          uncheckedIcon={<UnCheckedIcon style={{fill: "red"}} />}
          checkedIcon={<CheckedIcon style={{fill: "#0D3E69"}} />}
          />{' '}
         
        </Label>
                    </TableCell>
            <TableCell className={classes.tableHeaderCell}>Supplier Name</TableCell>
            <TableCell className={classes.tableHeaderCell}>Invoice No.</TableCell>
            <TableCell className={classes.tableHeaderCell}>PD No.</TableCell>
           
            <TableCell className={classes.tableHeaderCell}>Invoice Amount</TableCell>
            <TableCell className={classes.tableHeaderCell}>Token Requested</TableCell>

            <TableCell className={classes.tableHeaderCell}>Invoice Date</TableCell>

            <TableCell className={classes.tableHeaderCell}>Tenor (Days)</TableCell>
            <TableCell className={classes.tableHeaderCell}>Payment Date</TableCell>

           

          </TableRow>
        </TableHead>



<TableBody>

<TableRow key="gh" className="spacer mylinecol">
<TableCell className="chkp">
            <Label check>
          <Checkbox type="checkbox"
         
          uncheckedIcon={<UnCheckedIcon style={{fill: "red"}} />}
          checkedIcon={<CheckedIcon style={{fill: "#0D3E69"}} />}
          />{' '}
         
        </Label>
                    </TableCell>
              <TableCell>
                  <Grid container>
                      {/* <Grid item lg={2}>
                          <Avatar alt="gh" src='.' className={classes.avatar}/>
                      </Grid> */}
                      <Grid item lg={10}>
                    S1 Pvt Ltd
                      </Grid>
                  </Grid>
                </TableCell>
              <TableCell>
         2034
                </TableCell>
             
              <TableCell>
                 11010
                </TableCell>
                 <TableCell>
               10,00,000
                 </TableCell>
                 <TableCell>
                8,00,000
                 </TableCell>
                 
                 <TableCell>
                 1 June 2021
                 </TableCell>
                 <TableCell>19 Days</TableCell>

                 <TableCell>
                 30-july-2021
                 </TableCell>


                
            </TableRow>
        
           
<TableRow key="gh" className="spacer mylinecol">
<TableCell className="chkp">
            <Label check>
          <Checkbox type="checkbox"
         
          uncheckedIcon={<UnCheckedIcon style={{fill: "red"}} />}
          checkedIcon={<CheckedIcon style={{fill: "#0D3E69"}} />}
          />{' '}
         
        </Label>
                    </TableCell>
              <TableCell>
                  <Grid container>
                      {/* <Grid item lg={2}>
                          <Avatar alt="gh" src='.' className={classes.avatar}/>
                      </Grid> */}
                      <Grid item lg={10}>
                    S1 Pvt Ltd
                      </Grid>
                  </Grid>
                </TableCell>
              <TableCell>
         2034
                </TableCell>
             
              <TableCell>
                 11010
                </TableCell>
                 <TableCell>
               10,00,000
                 </TableCell>
                 <TableCell>
                8,00,000
                 </TableCell>
                 
                 <TableCell>
                 1 June 2021
                 </TableCell>
                 <TableCell>19 Days</TableCell>

                 <TableCell>
                 30-july-2021
                 </TableCell>


                
            </TableRow>
        


            <TableRow key="gh" className="spacer mylinelast">
<TableCell className="">
            
                    </TableCell>
                    <TableCell className="">
            
                    </TableCell>
              <TableCell>
                  <Grid container>
                      
                      <Grid item lg={10}>
                     Total 
                      </Grid>
                  </Grid>
                </TableCell>
              <TableCell>
           80,00,000
                </TableCell>
              <TableCell>64,00,000</TableCell>
              <TableCell>
                 
                </TableCell>
                 <TableCell>
                 
                 </TableCell>
                 <TableCell>
                 
                 </TableCell>
                 <TableCell>
                 
                 </TableCell>
                
                
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

        
        </ModalBody>
        {/* <ModalFooter>
          <Button color="primary" onClick={toggle}>Do Something</Button>{' '}
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter> */}
      </Modal>
       


       </div>
      
    );
}



export default recievedinvoice;

