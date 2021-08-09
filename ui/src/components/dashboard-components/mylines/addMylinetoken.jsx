import React, { useState,useEffect }  from "react";
import Checkbox from '@material-ui/core/Checkbox';
import { Alert,Form,FormGroup,Label,Input,TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

import FloatingLabelInput from 'react-floating-label-input';
// import 'react-floating-label-input/dist/react-floating-label-input.css';
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";

import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

import { makeStyles } from '@material-ui/core/styles';
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

  
const useStyles = makeStyles((theme) => ({
    table: {
      minWidth: 650,
      borderCollapse: 'separate',
    //  backgroundColor:'rgb(221,222,222)',
        borderSpacing:'0 15px',
    },
  
  
    tableContainer: {
        // borderRadius: 15,
        margin: '10px 10px',
        maxWidth: 950,
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
        fontSize:'12px',
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
     fontSize:'11px',
     
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

const addMylinetoken = (props) => {
  const classes = useStyles();

  const [userrole_fk, setrole_fk] = useState("");


  useEffect(() => {
    // const userDetails  = '';

    const USERID = localStorage.getItem('userid');
    axios
    .get('http://127.0.0.1:3001/api/user/getUserDetails?key=user_pk&value='+USERID)
    .then((res) => {
     if (res.status === 200 || res.status === "ok") { 
        // userDetails = res.data.result[0];

        setrole_fk( res.data.result[0].role_fk);
        // console.log(userDetails);
     }
    });  
  },[]);

  //accountDetails
  const accountDetails = (props.location.state) ? props.location.state.accountDetails : "";
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [pan, setPan] = useState("");
  const [bankname, setbankname] = useState("");
//   const [accountNumber, setAccountNumber] = useState("");
  const [token, settoken] = useState("");
  const [tokenamt, settokenamt] = useState("");
  const   history = useHistory();

 
  if(accountDetails){
    //setFirstName("sfsf")
  } else {
    
  }

   const username = localStorage.getItem('userName');
   const userId = localStorage.getItem('userid');
  
   

   const validationSchema = Yup.object().shape({
    name: Yup.string()
    .required(' name is required'),
    pan: Yup.string()
    .required('Pan No is required'),
 
    email: Yup.string()
    .required('Email is required')
    .email('Email is invalid'),
    
    bankname: Yup.string()
    .required('Bank Name is required'),
    phone: Yup.string()
    .required('Primary is required'),
    tokenamt: Yup.string()
    .required('Tokenliztion amount is required'),
    token: Yup.string()
    .required('Token is required'),
   
   
  
});



const { register,handleSubmit,watch,setValue,trigger  ,formState:{ errors,touchedFields }  } = useForm({
resolver: yupResolver(validationSchema)
}
);
   const onSubmit = (evt) => {
   // evt.preventDefault();
    // alert('dsfsd')

  
    // var userLoginData = {
    //   name : name,
    //   lastname : lastName,
    //   email : email,
    //   username : userName,
    //   password : password,
    //   gst_in : gstNumber,
    //   accountnumber: accountNumber,
    //   refrencenumber : refrenceId,
    //   userpk : Number(userId),
    //   role_fk : userrole_fk,
    //   permission : JSON.stringify(permissionobj)
    // }
    // console.log(permissionobj.toString())
    // axios
    //     .post(`http://127.0.0.1:3001/api/user/insertChildUser`, userLoginData)
    //     .then((res) => {
    //       if (res.status === 200 || res.status === "ok") {
    //            console.log(res)
    //                 history.push({
    //                     pathname: "/myaccount",
    //                   });
    //            toast(res.data.message);

    //       }  
    //       else
    //       {
    //       toast("error");

    //       }
    //     })
   } 


  return (
      <div className="innerprofile">
        <Form onSubmit={handleSubmit(onSubmit)}>
        <div className=" with-space">

        <Table className={classes.table} aria-label="simple table">
    
  

<TableBody>



  <TableRow key="gh" className="spacer mylineaddlast">

    <TableCell>
        <Grid container>
            
            <Grid item lg={10}>
          Invoice Amount:
          22,00,000
            </Grid>
        </Grid>
      </TableCell>
    <TableCell>
  No. of Invoice:
  3
      </TableCell>
    
    <TableCell>
      Last Due Date:
      30 july 2021
      </TableCell>
      
  </TableRow>








       </TableBody>
   
    </Table>

        <Row>
   
       
<Col sm="12" className="text-left">
  <p className="profilehead">Add Tokens </p>
  
  </Col></Row>
        <Row form>
        <Col md={6}>

      
        <FormGroup className=" input-spacing inputouter">
        <FloatingLabelInput
      id="example-3"
      label=" Token Amount"  
      {...register("name", { value: name })} value={name}

      onChange={(e) => setName(e.target.value)}

    />
      {errors.name ? <p class="text-danger padd-l-r-10 margin-b-0">{errors.name.message}</p> : '' }

        </FormGroup></Col>
        <Col md={6}>
        <FormGroup className=" input-spacing selectouter">
        <Label for="exampleSelectMulti">Select Token</Label>
        <Input type="select"  {...register("token")} onChange={(e) => settoken(e.target.value)} >
        <option value="">Select Token</option>

         {/* {rolelist.map((prop, key) => { */}
       
       <option value="1">A1- ltd</option>
      {/* })}  */}
         
        </Input>

        {errors.token ? <p class="text-danger">{errors.token.message}</p> : '' }
                         {/* <p>  {errors.email?.type=== 'required' && "Enter valid Email"}  </p>   */}

      </FormGroup>
        
        
        </Col>
        </Row>
        <Row form>
				<Col md={6}>

                    
                <FormGroup className=" input-spacing selectouter">

                    
        <Label for="exampleSelectMulti">Tokenlization Amount</Label>
        <Input type="select"  {...register("tokenamt")} onChange={(e) => settokenamt(e.target.value)} >
        <option value="">Tokenlization Amount</option>

         {/* {rolelist.map((prop, key) => { */}
       
       <option value="1">A1- ltd</option>
      {/* })}  */}
         
        </Input>

        {errors.tokenamt ? <p class="text-danger">{errors.tokenamt.message}</p> : '' }
                         {/* <p>  {errors.email?.type=== 'required' && "Enter valid Email"}  </p>   */}

      </FormGroup>
				</Col>
				<Col md={6}>
					<FormGroup className=" input-spacing inputouter">
						<FloatingLabelInput id="example-3" label="Token Deducted" 
      {...register("phone", { value: phone })} value={phone}
           
      onChange={(e) => setPhone(e.target.value)}
         
            />
         {errors.phone ? <p class="text-danger padd-l-r-10 margin-b-0">{errors.phone.message}</p> : '' }

					</FormGroup>
				</Col>
			</Row>
      <Row form>
				<Col md={6}>
					<FormGroup className=" input-spacing inputouter">
						<FloatingLabelInput id="example-3" label="PV"  
      {...register("bankname", { value: bankname })} value={bankname}
             
            onChange={(e) => setbankname(e.target.value)}
            />
         {errors.bankname ? <p class="text-danger padd-l-r-10 margin-b-0">{errors.bankname.message}</p> : '' }

					</FormGroup>
				</Col>
					</Row>
     

 

    </div>
     
       
        {/* Form End From Here */}

        <Row>
   
       
<Col sm="6" className="text-left">
<Button  type="submit" className="profilebtn margin-right-15">
          Submit
          </Button>


          <Button  type="submit" className="profilebtnreset margin-right-15">
           Reset
          </Button>

          <Link   to={{
    pathname: "/myaccount"}} className="profilebtncancel margin-right-15">
          Cancel
          </Link>
        </Col>
</Row>

        </Form>
        <ToastContainer />

        </div>
        // <Card>
        //     <CardBody>
        //         <CardTitle>Feeds</CardTitle>
        //         <div className="feed-widget">
        //             <ul className="list-style-none feed-body  pb-3">
        //                 <li className="feed-item">
        //                     <div className="feed-icon bg-info"><i className="far fa-bell"></i></div> You have 4 pending tasks. <span className="ml-auto font-12 text-muted">Just Now</span>
        //                 </li>
        //                 <li className="feed-item">
        //                     <div className="feed-icon bg-success"><i className="ti-server"></i></div> Server #1 overloaded.<span className="ml-auto font-12 text-muted">2 Hours ago</span>
        //                 </li>
        //                 <li className="feed-item">
        //                     <div className="feed-icon bg-warning"><i className="ti-shopping-cart"></i></div> New order received.<span className="ml-auto font-12 text-muted">31 May</span>
        //                 </li>
        //                 <li className="feed-item">
        //                     <div className="feed-icon bg-danger"><i className="ti-user"></i></div> New user registered.<span className="ml-auto font-12 text-muted">30 May</span>
        //                 </li>
        //             </ul>
        //         </div>
        //     </CardBody>
        // </Card>
    );
}

export default addMylinetoken;
