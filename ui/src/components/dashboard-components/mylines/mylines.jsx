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

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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

const Mylines = () => {
  const classes = useStyles();
    const history = useHistory();
    const username = localStorage.getItem('userName');
    const userId = localStorage.getItem('userid');
    


    // withdraw
    const [Wamt, setWamt] = useState("");

    const [modal, setModal] = useState(false);
    const [backdrop, setBackdrop] = useState(true);
    
    const toggle = () => setModal(!modal);
  
    // const changeBackdrop = e => {
    //   let value = e.target.value;
    //   if (value !== 'static') {
    //     value = JSON.parse(value);
    //   }
    //   setBackdrop(value);
    // }


// pay
const [payamt, setpayamt] = useState("");

const [modalpay, setModalpay] = useState(false);
    const [backdroppay, setBackdroppay] = useState(true);
    
    const togglepay = () => setModalpay(!modalpay);
  
    // const changeBackdrop = e => {
    //   let value = e.target.value;
    //   if (value !== 'static') {
    //     value = JSON.parse(value);
    //   }
    //   setBackdroppay(value);
    // }


    return (
       <> 
               <div className="myaccount">
            
      
            <TableContainer component={Paper} className={classes.tableContainer}>
            <Row>
       
           
       <Col sm="4" className="text-left">
        <p className="profilehead">My Lines</p>
         
         </Col>
         
         <Col sm="8" className="text-right">

         <Link  to={{
         pathname: `/addtoken`,
         state: { test : 'testing'}
    }} className="myacaprv margin-right-15">
   
              ADD TOKEN
              </Link>
    
    
              <Button  type="submit" className="myacrjct margin-right-15" onClick={toggle}>
               Withdraw Token
              </Button>
    
              <Button  type="submit" className="myacedit margin-right-15" onClick={togglepay}>
              Pay Token
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
            <TableCell className={classes.tableHeaderCell}>Financial Instituion</TableCell>
            <TableCell className={classes.tableHeaderCell}>Sanctional Line</TableCell>
            <TableCell className={classes.tableHeaderCell}>Discount Rate</TableCell>
            <TableCell className={classes.tableHeaderCell}>Token Issued</TableCell>
            <TableCell className={classes.tableHeaderCell}>Token Realeasd</TableCell>
            <TableCell className={classes.tableHeaderCell}>Available Lines</TableCell>

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
                      Goodluck Bank
                      </Grid>
                  </Grid>
                </TableCell>
              <TableCell>
            1,00,0000
                </TableCell>
              <TableCell>8%</TableCell>
              <TableCell>
                  50,000
                </TableCell>
                 <TableCell>
                 40,000
                 </TableCell>
                 <TableCell>
                 50,000
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
                      Goodluck Bank
                      </Grid>
                  </Grid>
                </TableCell>
              <TableCell>
            1,00,0000
                </TableCell>
              <TableCell>8%</TableCell>
              <TableCell>
                  50,000
                </TableCell>
                 <TableCell>
                 40,000
                 </TableCell>
                 <TableCell>
                 50,000
                 </TableCell>
            </TableRow>
      




            <TableRow key="gh" className="spacer mylinelast">
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
                      Goodluck Bank
                      </Grid>
                  </Grid>
                </TableCell>
              <TableCell>
            1,00,0000
                </TableCell>
              <TableCell>8%</TableCell>
              <TableCell>
                  50,000
                </TableCell>
                 <TableCell>
                 40,000
                 </TableCell>
                 <TableCell>
                 50,000
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




          
            <Row className="margin-top-15">
       
           
       <Col sm="4" className="text-left">
        <span className="profilehead">Discounting Lines</span>
         
         </Col>
         
         <Col sm="8" className="text-right">
   
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
            <TableCell className={classes.tableHeaderCell}>Financial Instituion</TableCell>
            <TableCell className={classes.tableHeaderCell}>Sanctional Line</TableCell>
            <TableCell className={classes.tableHeaderCell}>Discount Rate</TableCell>
            <TableCell className={classes.tableHeaderCell}>Outstanding</TableCell>
            {/* <TableCell className={classes.tableHeaderCell}>Token Realeasd</TableCell> */}
            <TableCell className={classes.tableHeaderCell}>Available Lines</TableCell>

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
                      Goodluck Bank
                      </Grid>
                  </Grid>
                </TableCell>
              <TableCell>
            1,00,0000
                </TableCell>
              <TableCell>8%</TableCell>
              <TableCell>
                  50,000
                </TableCell>
                
                 <TableCell>
                 50,000
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
                      Goodluck Bank
                      </Grid>
                  </Grid>
                </TableCell>
              <TableCell>
            1,00,0000
                </TableCell>
              <TableCell>8%</TableCell>
              <TableCell>
                  50,000
                </TableCell>
               
                 <TableCell>
                 50,000
                 </TableCell>
            </TableRow>
      




            <TableRow key="gh" className="spacer mylinelast">
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
                    Total
                      </Grid>
                  </Grid>
                </TableCell>
              <TableCell>
           30000
                </TableCell>
              <TableCell></TableCell>
              <TableCell>
                  50,000
                </TableCell>
                
                 <TableCell>
                 50,000
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
             
             </div>
            
           
 
             <Modal isOpen={modal}  centered= {true} toggle={toggle}  modalClassName="witdrawTokenM" contentClassName="witdrawTokenM"  size="md" backdrop={backdrop} >
        {/* <ModalHeader toggle={toggle}>  <Row>
       
           
       <Col  className="text-left">
        <p className="profilehead">Withdraw Token</p>
         
         </Col>
         </Row>
         </ModalHeader> */}
        <ModalBody>

        <Row>
       
           
       <Col  className="text-left">
        <p className="modalhead">Withdraw Token</p>
         
         </Col>
         </Row>
        <Form >

        <Row form className="margin-top-15">
        <Col >

      
        <FormGroup className=" input-spacing inputouter">
        <FloatingLabelInput
      id="example-3"
      label="Token Withdraw Request Ammount"  value=""
      value={Wamt}
      onChange={(e) => setWamt(e.target.value)}
    />
     
        </FormGroup></Col></Row>

<Row className="margin-top-15">
<Col>
        <Button type="submit" className="myacaprv margin-right-15">
   
              Confirm
              </Button>
    
    
              <Button  type="submit" className="myacedit margin-right-15" onClick={toggle}>
             Cancel
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
       









      <Modal isOpen={modalpay}  centered= {true} toggle={togglepay}  modalClassName="witdrawTokenM" contentClassName="witdrawTokenM"  size="md" backdrop={backdroppay} >
        {/* <ModalHeader toggle={toggle}>  <Row>
       
           
       <Col  className="text-left">
        <p className="profilehead">Withdraw Token</p>
         
         </Col>
         </Row>
         </ModalHeader> */}
        <ModalBody>

        <Row>
       
           
       <Col  className="text-left">
        <p className="modalhead">Pay Token </p>
         
         </Col>
         </Row>
        <Form >

        <Row form className="margin-top-15">
        <Col >

      
        <FormGroup className=" input-spacing inputouter">
        <FloatingLabelInput
      id="example-3"
      label="Pay Token Ammount"  value=""
      value={payamt}
      onChange={(e) => setpayamt(e.target.value)}
    />
     
        </FormGroup></Col></Row>

<Row className="margin-top-15">
<Col>
        <Button type="submit" className="myacaprv margin-right-15">
   
              Confirm
              </Button>
    
    
              <Button  type="submit" className="myacedit margin-right-15" onClick={toggle}>
             Cancel
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



export default Mylines;
