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





const Addacount = (props) => {
  const [userrole_fk, setrole_fk] = useState("");
  const [userDetails, setUserDetails] = useState({});


  useEffect(() => {
    // const userDetails  = '';
    const USERID = localStorage.getItem('userid');
    const sendData = {
      key: 'user_pk',
      value: USERID,
     
    };

    axios
    .post('http://127.0.0.1:3001/api/user/getUserDetails',sendData)
    .then((res) => {
     if (res.status === 200 || res.status === "ok") { 
        // userDetails = res.data.result[0];
        setUserDetails(res.data.result[0]);
        setrole_fk( res.data.result[0].role_fk);
        updateState();
        // console.log(userDetails);
     }
    });  
  },[]);

  const updateState = () => {
    console.log(userrole_fk)
  }

  //accountDetails
  const accountDetails = (props.location.state) ? props.location.state.accountDetails : "";
  const [firstName, setFirstName] = useState("");
  const [lastName, setLasttName] = useState("");
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [gstNumber, setGSTNumber] = useState("");
  const [refrenceId, setRefrenceId] = useState("");
  const   history = useHistory();

 
  if(accountDetails){
    //setFirstName("sfsf")
  } else {
    
  }

   const username = localStorage.getItem('userName');
   const userId = localStorage.getItem('userid');
  
   var abc  = true;

   
   const [tokenview, clickfortokenview] = React.useState(true);
   const changeforclickfortokenview = (event) => {
    clickfortokenview(event.target.checked);
  };
  
  const [tokencreate, clickfortokencreate] = React.useState(true);
  const changeforclickfortokencreate = (event) => {
   clickfortokencreate(event.target.checked);
  };

  const [tokenapprove, clickfortokenapprove] = React.useState(true);
  const changeforclickfortokenapprove = (event) => {
   clickfortokenapprove(event.target.checked);
  };

  const [userview, clickforuserview] = React.useState(false);
  const changeforclickforuserview = (event) => {
   clickforuserview(event.target.checked);
 };
 
 const [usercreate, clickforusercreate] = React.useState(false);
 const changeforclickforusercreate = (event) => {
   console.log(userDetails)
  if(userDetails.isroot == "1"){
    clickforusercreate(event.target.checked);
  } else {
    clickforusercreate(false);
  } 
 };

 const [userapprove, clickforuserapprove] = React.useState(false);
 const changeforclickforuserapprove = (event) => {
  clickforuserapprove(event.target.checked);
 };

  const [invoiceview, clickforinvoiceview] = React.useState(true);
  const changeforclickforinvoiceview = (event) => {
    clickforinvoiceview(event.target.checked);
  };

  const [invoicecreate, clickforinvoicecreate] = React.useState(true);
  const changeforclickforinvoicecreate = (event) => {
    clickforinvoicecreate(event.target.checked);
  };
     
  const [invoiceapprove, clickforinvoiceapprove] = React.useState(true);
  const changeforclickforinvoiceapprove = (event) => {
    clickforinvoiceapprove(event.target.checked);
  };


   var permissionobj = {
     "tokenview" : tokenview,
     "tokencreate" : tokencreate,
     "tokenapprove" : tokenapprove,
     "invoiceview" : invoiceview,
     "invoicecreate" : invoicecreate,
     "invoiceapprove" :invoiceapprove, 
     "userview" : userview,
     "usercreate" : usercreate,
     "userapprove" :userapprove, 

   }

   const validationSchema = Yup.object().shape({
    fname: Yup.string()
    .required('First name is required'),
    lname: Yup.string()
    .required('Last name is required'),
 
    email: Yup.string()
    .required('Email is required')
    .email('Email is invalid'),
    
    uname: Yup.string()
    .required('Username is required'),
    password: Yup.string()
    .required('Password is required'),
    acn: Yup.string()
    .required('Account Nu. is required'),
    gstin: Yup.string()
    .required('GST IN is required'),
    Urid: Yup.string()
    .required('User Reffrence is required'),
  
   
  
});



const { register,handleSubmit,watch,setValue,trigger  ,formState:{ errors,touchedFields }  } = useForm({
resolver: yupResolver(validationSchema)
}
);
   const onSubmit = (evt) => {
   // evt.preventDefault();
    // alert('dsfsd')

   console.log(tokenview)
    var userLoginData = {
      firstname : firstName,
      lastname : lastName,
      email : email,
      username : userName,
      password : password,
      gst_in : gstNumber,
      accountnumber: accountNumber,
      refrencenumber : refrenceId,
      isroot: usercreate ? 1 : null,
      userpk : userDetails.parent_id ? Number(userDetails.parent_id) : Number(userId),
      role_fk : userDetails.role_fk,
      permission : JSON.stringify(permissionobj)
    }
    console.log(permissionobj.toString())
    axios
        .post(`http://127.0.0.1:3001/api/user/insertChildUser`, userLoginData)
        .then((res) => {
          if (res.status === 200 || res.status === "ok") {
               console.log(res)
                    history.push({
                        pathname: "/myaccount",
                      });
               toast(res.data.message);

          }  
          else
          {
          toast("error");

          }
        })
   } 

  return (
      <div className="innerprofile">
        <Form onSubmit={handleSubmit(onSubmit)}>
        <div className=" with-space">

        <Row>
   
       
<Col sm="12" className="text-left">
  <p className="profilehead">Add New User</p>
  
  </Col></Row>
        <Row form>
        <Col md={6}>

      
        <FormGroup className=" input-spacing inputouter">
        <FloatingLabelInput
      id="example-3"
      label="First Name"  {...register("fname", { value: firstName })} value={firstName}
      onChange={(e) => setFirstName(e.target.value)}

    />
      {errors.fname ? <p class="text-danger padd-l-r-10 margin-b-0">{errors.fname.message}</p> : '' }

        </FormGroup></Col>
        <Col md={6}>
        <FormGroup className=" input-spacing inputouter">
        <FloatingLabelInput
      id="example-3"
      label="Last Name"   {...register("lname", { value: lastName })} value={lastName}
      onChange={(e) => setLasttName(e.target.value)}

    />
         
         {errors.lname ? <p class="text-danger padd-l-r-10 margin-b-0">{errors.lname.message}</p> : '' }

        </FormGroup></Col>
        </Row>
        <Row form>
				<Col md={6}>
					<FormGroup className=" input-spacing inputouter">
						<FloatingLabelInput id="example-3" label="Email"
            {...register("email", { value: email })} value={email}
            onChange={(e) => setEmail(e.target.value)} 
            />
         {errors.email ? <p class="text-danger padd-l-r-10 margin-b-0">{errors.email.message}</p> : '' }

					</FormGroup>
				</Col>
				<Col md={6}>
					<FormGroup className=" input-spacing inputouter">
						<FloatingLabelInput id="example-3" label="Username" 
            {...register("uname", { value: userName })} value={userName}
            onChange={(e) => setUserName(e.target.value)} 
            />
         {errors.uname ? <p class="text-danger padd-l-r-10 margin-b-0">{errors.uname.message}</p> : '' }

					</FormGroup>
				</Col>
			</Row>
      <Row form>
				<Col md={6}>
					<FormGroup className=" input-spacing inputouter">
						<FloatingLabelInput id="example-3" label="Password"  type="password"
             {...register("password", { value: password })}  value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
         {errors.password ? <p class="text-danger padd-l-r-10 margin-b-0">{errors.password.message}</p> : '' }

					</FormGroup>
				</Col>
				<Col md={6}>
					<FormGroup className=" input-spacing inputouter">
						<FloatingLabelInput id="example-3" label="Account No"  
             {...register("acn", { value: accountNumber })} value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
            />
         {errors.acn ? <p class="text-danger padd-l-r-10 margin-b-0">{errors.acn.message}</p> : '' }

					</FormGroup>
				</Col>
			</Row>
        <Row form>
        <Col md={6}>
        <FormGroup className=" input-spacing inputouter">
        <FloatingLabelInput
      id="example-3"
      label="GST IN"
      {...register("gstin", { value: gstNumber })} value={gstNumber}
      onChange={(e) => setGSTNumber(e.target.value)}
    />
         {errors.gstin ? <p class="text-danger padd-l-r-10 margin-b-0">{errors.gstin.message}</p> : '' }

        </FormGroup>
        </Col>

        </Row>


        <Row form>

        <Col md={12}>

            
        <FormGroup className=" input-spacing padd-l-0" check> 
        <Label className="chkhead">
         
         Tokens Access
        </Label>
        

        <Label check className="chkwidth">
     <Checkbox
       defaultChecked
       color="primary"
        checked={tokenview}
        onChange={changeforclickfortokenview}
        inputProps={{ 'aria-label': 'primary checkbox' }}
      />
         View
        </Label>

        <Label check className="chkwidth">
        <Checkbox
          defaultChecked
          color="primary"
        checked={tokencreate}
        onChange={changeforclickfortokencreate}
        inputProps={{ 'aria-label': 'primary checkbox' }}
      />
         Create
        </Label>
        <Label check className="chkwidth">
        <Checkbox
          defaultChecked
          color="primary"
        checked={tokenapprove}
        onChange={changeforclickfortokenapprove}
        inputProps={{ 'aria-label': 'primary checkbox' }}
      />
         Approve
        </Label>
       
        </FormGroup>
        </Col>
       
        </Row>
        <Row form>

        <Col md={12}>

            
        <FormGroup className=" input-spacing padd-l-0" check> 
        <Label className="chkhead">
         
         User Access
        </Label>
        

        <Label check className="chkwidth">
     <Checkbox
       color="primary"
        checked={userview}
        onChange={changeforclickforuserview}
        inputProps={{ 'aria-label': 'primary checkbox' }}
      />
         View
        </Label>

        <Label check className="chkwidth">
        <Checkbox
          color="primary"
        checked={usercreate}
        onChange={changeforclickforusercreate}
        inputProps={{ 'aria-label': 'primary checkbox' }}
      />
         Create
        </Label>
        <Label check className="chkwidth">
        <Checkbox
          color="primary"
        checked={userapprove}
        onChange={changeforclickforuserapprove}
        inputProps={{ 'aria-label': 'primary checkbox' }}
      />
         Approve
        </Label>
       
        </FormGroup>
        </Col>
       
        </Row>
        
        <Row form>

        
        <Col md={12}>
        <FormGroup className=" input-spacing padd-l-0 " check>
        <Label className="chkhead">
         
         Invoice Access
        </Label>
        
        <Label check className="chkwidth">
        <Checkbox
          defaultChecked
          color="primary"
        checked={invoiceview}
        onChange={changeforclickforinvoiceview}
        inputProps={{ 'aria-label': 'primary checkbox' }}
      />
         View
        </Label>

        <Label check className="chkwidth">
        <Checkbox
          defaultChecked
          color="primary"
        checked={invoicecreate}
        onChange={changeforclickforinvoicecreate}
        inputProps={{ 'aria-label': 'primary checkbox' }}
      />
         Create
        </Label>
        <Label check className="chkwidth">
        <Checkbox
          defaultChecked
          color="primary"
        checked={invoiceapprove}
        onChange={changeforclickforinvoiceapprove}
        inputProps={{ 'aria-label': 'primary checkbox' }}
      />
         Approve
        </Label>
       
        </FormGroup>
        </Col>
       
        </Row>


        <Row form>

<Col md={6}>

<FormGroup className=" input-spacing inputouter">
<FloatingLabelInput
      id="example-3"
      label="User Reference ID"
      {...register("Urid", { value: refrenceId })} value={refrenceId}
      onChange={(e) => setRefrenceId(e.target.value)}

    />

{errors.Urid ? <p class="text-danger padd-l-r-10 margin-b-0">{errors.Urid.message}</p> : '' }

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

export default Addacount;
