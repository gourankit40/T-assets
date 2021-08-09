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

const discountinvoice = (props) => {
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
      <>
      <div className="innerprofile">
        <Form onSubmit={handleSubmit(onSubmit)}>
        <div className=" with-space">

       
        <Row>
   
       
<Col sm="12" className="text-left">
  <p className="profilehead">Discount Invoice </p>
  
  </Col></Row>
        <Row form>
        <Col md={4}>

      
        <FormGroup className=" input-spacing inputouter">
        <FloatingLabelInput
      id="example-3"
      label=" Token Amount"  
      {...register("name", { value: name })} value={name}

      onChange={(e) => setName(e.target.value)}

    />
      {errors.name ? <p class="text-danger padd-l-r-10 margin-b-0">{errors.name.message}</p> : '' }

        </FormGroup></Col>
        <Col md={4}>

      
        <FormGroup className=" input-spacing inputouter">
        <FloatingLabelInput
      id="example-3"
      label="No. Invoice"  
    //   {...register("name", { value: name })} value={name}

    //   onChange={(e) => setName(e.target.value)}

    />
      {/* {errors.name ? <p class="text-danger padd-l-r-10 margin-b-0">{errors.name.message}</p> : '' } */}

        </FormGroup></Col>

        <Col md={4}>

      
        <FormGroup className=" input-spacing inputouter">
        <FloatingLabelInput
      id="example-3"
      label="Buyer"  
    //   {...register("name", { value: name })} value={name}

    //   onChange={(e) => setName(e.target.value)}

    />
      {/* {errors.name ? <p class="text-danger padd-l-r-10 margin-b-0">{errors.name.message}</p> : '' } */}

        </FormGroup></Col>
        </Row>
        <Row form>
        <Col md={4}>

      
<FormGroup className=" input-spacing inputouter">
<FloatingLabelInput
id="example-3"
label="Last Invoice Due Date"  
//   {...register("name", { value: name })} value={name}

//   onChange={(e) => setName(e.target.value)}

/>
{/* {errors.name ? <p class="text-danger padd-l-r-10 margin-b-0">{errors.name.message}</p> : '' } */}

</FormGroup></Col>
				<Col md={4}>
					<FormGroup className=" input-spacing inputouter">
						<FloatingLabelInput id="example-3" label="Token Amount" 
    //   {...register("phone", { value: phone })} value={phone}
           
    //   onChange={(e) => setPhone(e.target.value)}
         
            />
         {/* {errors.phone ? <p class="text-danger padd-l-r-10 margin-b-0">{errors.phone.message}</p> : '' } */}

					</FormGroup>
				</Col>

                <Col md={4}>

      
<FormGroup className=" input-spacing inputouter">
<FloatingLabelInput
id="example-3"
label="Token Issuer"  
//   {...register("name", { value: name })} value={name}

//   onChange={(e) => setName(e.target.value)}

/>
{/* {errors.name ? <p class="text-danger padd-l-r-10 margin-b-0">{errors.name.message}</p> : '' } */}

</FormGroup></Col>
			</Row>
      <Row form>
				<Col md={4}>
					<FormGroup className=" input-spacing inputouter">
						<FloatingLabelInput id="example-3" label="Discounting Bank"  
    //   {...register("bankname", { value: bankname })} value={bankname}
             
            // onChange={(e) => setbankname(e.target.value)}
            />
         {/* {errors.bankname ? <p class="text-danger padd-l-r-10 margin-b-0">{errors.bankname.message}</p> : '' } */}

					</FormGroup>
				</Col>

                <Col md={4}>

      
<FormGroup className=" input-spacing inputouter">
<FloatingLabelInput
id="example-3"
label="Discounting Factor"  
//   {...register("name", { value: name })} value={name}

//   onChange={(e) => setName(e.target.value)}

/>
{/* {errors.name ? <p class="text-danger padd-l-r-10 margin-b-0">{errors.name.message}</p> : '' } */}

</FormGroup></Col>

<Col md={4}>

      
<FormGroup className=" input-spacing inputouter">
<FloatingLabelInput
id="example-3"
label="Processing Fee"  
//   {...register("name", { value: name })} value={name}

//   onChange={(e) => setName(e.target.value)}

/>
{/* {errors.name ? <p class="text-danger padd-l-r-10 margin-b-0">{errors.name.message}</p> : '' } */}

</FormGroup></Col>
					</Row>



                    <Row form>
				<Col md={4}>
					<FormGroup className=" input-spacing inputouter">
						<FloatingLabelInput id="example-3" label="Other Cahnges"  
    //   {...register("bankname", { value: bankname })} value={bankname}
             
            // onChange={(e) => setbankname(e.target.value)}
            />
         {/* {errors.bankname ? <p class="text-danger padd-l-r-10 margin-b-0">{errors.bankname.message}</p> : '' } */}

					</FormGroup>
				</Col>

                <Col md={4}>

      
<FormGroup className=" input-spacing inputouter">
<FloatingLabelInput
id="example-3"
label="Discount Request Date"  
//   {...register("name", { value: name })} value={name}

//   onChange={(e) => setName(e.target.value)}

/>
{/* {errors.name ? <p class="text-danger padd-l-r-10 margin-b-0">{errors.name.message}</p> : '' } */}

</FormGroup></Col>


					</Row>
     

 

    </div>
     
       
        {/* Form End From Here */}

     

        </Form>
        <ToastContainer />


      
        </div>
        <Row>
   
       
   <Col sm="12" className="text-left">
     <p className="profilehead discountvalue">Expected Discount Value </p>
     
     </Col></Row>

        <Table className={classes.table} aria-label="simple table">
    
  

    <TableBody>
    
    
    
      <TableRow key="gh" className="spacer mylineaddlast">
    
        <TableCell>
            <Grid container>
                
                <Grid item lg={10}>
              Total:<br></br>
             <b> 22,00,000</b>
                </Grid>
            </Grid>
          </TableCell>
        <TableCell>
     Tommorow: <br></br>
     <b> 20,68,000</b>
          </TableCell>
        
        <TableCell>
         T+2: <br></br>
        <b> 20,66,000</b>
          </TableCell>
          <TableCell>
         T+4: <br></br>
         <b>  20,64,000</b>
          </TableCell>
          <TableCell>
         T+5: <br></br>
       <b>  20,62,000</b>
          </TableCell>
          
      </TableRow>
    
    
    
    
    
    
    
    
           </TableBody>
       
        </Table>
    

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
     </>
    );
}

export default discountinvoice;
