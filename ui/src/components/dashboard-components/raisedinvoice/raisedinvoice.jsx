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

import UnCheckedIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckedIcon from '@material-ui/icons/CheckBox'

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

const raisedinvoice = () => {
  const classes = useStyles();


   // Search
   const [Wamt, setWamt] = useState("");

   const [modal, setModal] = useState(false);
   const [backdrop, setBackdrop] = useState(true);
   
   const toggle = () => setModal(!modal);
    return (
       <> 
       <TableContainer component={Paper} className={classes.tableContainer}>
            <Row>
       
           
       <Col sm="2" className="text-left">
        <p className="profilehead">Raised Invoice</p>
         
         </Col>
         
         <Col sm="10" className="text-right toknrcv">
        
        
              <Link  to={{
         pathname: `/uploadinvoice`,
         state: { test : 'testing'}
    }} className="myacaprv margin-right-15">
   
   Raise Invoice 
              </Link>
              <Button  type="submit" className="myacedit margin-right-15" onClick={toggle}>
              Search & Filter
              </Button>
              <Button  type="submit" className="myacrjct margin-right-15" >
               Delete 
              </Button>
              <Button  type="submit" className="myacedit margin-right-15" >
             Modify
              </Button>
              <Button  type="submit" className="myacedit margin-right-15" >
             Request Token
              </Button>
              {/* <Button  type="submit" className="myacedit margin-right-15" >
            Discount
              </Button> */}
            
              <Link  to={{
         pathname: `/discountinvoice`,
         state: { test : 'testing'}
    }} className="myacedit margin-right-15">
   
   Discount
              </Link>
            
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
            <TableCell className={classes.tableHeaderCell}>Buyer</TableCell>
            <TableCell className={classes.tableHeaderCell}>Inv No.</TableCell>
            <TableCell className={classes.tableHeaderCell}>Inv Date</TableCell>

            <TableCell className={classes.tableHeaderCell}>Due Date</TableCell>
           
            <TableCell className={classes.tableHeaderCell}>Inv Amt</TableCell>
            <TableCell className={classes.tableHeaderCell}>Recieved by buyer</TableCell>


            <TableCell className={classes.tableHeaderCell}>Token Recieved</TableCell>

            <TableCell className={classes.tableHeaderCell}>Balance Receivable</TableCell>

            <TableCell className={classes.tableHeaderCell}>Pv of Token</TableCell>
            <TableCell className={classes.tableHeaderCell}>Inv, Discounted</TableCell>

           

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
                    A1 Pvt Ltd
                      </Grid>
                  </Grid>
                </TableCell>
              <TableCell>
         123
                </TableCell>
             
              <TableCell>
                 1 jun 2021
                </TableCell>
                 <TableCell>
              29 july 2021
                 </TableCell>
                 <TableCell>
                22,00,000
                 </TableCell>
                 
                 <TableCell>
                 No
                 </TableCell>
                 <TableCell>0</TableCell>

                 <TableCell>
                22,00,000
                 </TableCell>

                 <TableCell>
                0
                 </TableCell>
                 <TableCell>
                No
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
                    A1 Pvt Ltd
                      </Grid>
                  </Grid>
                </TableCell>
              <TableCell>
         123
                </TableCell>
             
              <TableCell>
                 1 jun 2021
                </TableCell>
                 <TableCell>
              29 july 2021
                 </TableCell>
                 <TableCell>
                22,00,000
                 </TableCell>
                 
                 <TableCell>
                 No
                 </TableCell>
                 <TableCell>0</TableCell>

                 <TableCell>
                22,00,000
                 </TableCell>

                 <TableCell>
                0
                 </TableCell>
                 <TableCell>
                No
                 </TableCell>

                
            </TableRow>
        

            <TableRow key="gh" className="spacer mylinelast">
<TableCell className="">
            
                    </TableCell>
                    <TableCell>
                 
                 </TableCell>
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
           73,00,000
                </TableCell>
              <TableCell></TableCell>
              <TableCell>
              38,00,000
                </TableCell>
                 <TableCell>
                 25,00,000
                 </TableCell>
                 <TableCell>
                 36,00,000
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
            <Modal isOpen={modal}  centered= {true} toggle={toggle}  modalClassName="" contentClassName="searchmodal"  size="lg" backdrop={backdrop} >
        {/* <ModalHeader toggle={toggle}>  <Row>
       
           
       <Col  className="text-left">
        <p className="profilehead">Withdraw Token</p>
         
         </Col>
         </Row>
         </ModalHeader> */}
        <ModalBody>

        <Row>
       
           
       <Col  className="text-left">
        <p className="modalhead">Search & Filter</p>
         
         </Col>
         </Row>
        <Form >

        <Row form>
        <Col md={4}>

      
        <FormGroup className=" input-spacing inputouter">
        <FloatingLabelInput
      id="example-3"
      label="Search Buyer Name"  
      // {...register("name", { value: name })} value={name}

      // onChange={(e) => setName(e.target.value)}

    />
      {/* {errors.name ? <p class="text-danger padd-l-r-10 margin-b-0">{errors.name.message}</p> : '' } */}

        </FormGroup></Col>
        <Col md={4}>
        <FormGroup className=" input-spacing selectouter">

                    
<Label for="exampleSelectMulti">Filter By</Label>
<Input type="select"   >
<option value="">Tokenlization Amount</option>

 {/* {rolelist.map((prop, key) => { */}

<option value="1">A1- ltd</option>
{/* })}  */}
 
</Input>

{/* {errors.tokenamt ? <p class="text-danger">{errors.tokenamt.message}</p> : '' } */}
                 {/* <p>  {errors.email?.type=== 'required' && "Enter valid Email"}  </p>   */}

</FormGroup>
        
        
        </Col>


        <Col md={4}>
        <FormGroup className=" input-spacing selectouter">

                    
<Label for="exampleSelectMulti">Value</Label>
<Input type="select"   >
<option value="">Tokenlization Amount</option>

 {/* {rolelist.map((prop, key) => { */}

<option value="1">A1- ltd</option>
{/* })}  */}
 
</Input>

{/* {errors.tokenamt ? <p class="text-danger">{errors.tokenamt.message}</p> : '' } */}
                 {/* <p>  {errors.email?.type=== 'required' && "Enter valid Email"}  </p>   */}

</FormGroup>
        
       </Col>
        </Row>
<Row className="margin-top-15">
<Col>
        <Button type="submit" className="myacaprv margin-right-15">
   
              Submit
              </Button>
    
    
              <Button  type="submit" className="myacedit margin-right-15" onClick={toggle}>
             Reset
              </Button>
              </Col>
              </Row>
        </Form>
        </ModalBody>
        {/* <ModalFooter>
          <Button color="primary" onClick={toggle}>Do Something</Button>{' '}
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter> */}
      </Modal>
       
       </>
    );
}



export default raisedinvoice;
