import React, { Component,useState,useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import Checkbox from '@material-ui/core/Checkbox';

import { Alert,Form,FormGroup,Label,Input,TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

import FloatingLabelInput from 'react-floating-label-input';

import axios from "axios";
import { useForm } from "react-hook-form";

import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from "react-loader-spinner";

const EditAccount = (props) => {

// export default class EditAccount extends Component {
    // constructor(props) {
        // super(props);
        // this.listRef = React.createRef();

        const userDetails  = props.location.state.accountDetails.row;
        console.log(userDetails)
        console.log(refrenceId);
        const [accountNumber, setAccountNumber] = useState('');
        const [gstNumber, setGSTNumber] = useState('');
        const [refrenceId, setRefrenceId] = useState(userDetails.parent_id);
        const [acid, setACid] = useState('');
        const [isloader, setLoader] = useState(false);
        
        useEffect(() => {

            // const userid =localStorage.getItem('userid')? localStorage.getItem('userid') : '';
          
        
           
          //setValue("accountName", data2.data.result[0].account_name);
                  
            axios.get('http://127.0.0.1:3001/api/user/getUserAccountInfo?key=user_fk&value='+userDetails.user_pk)
                  
                  
                      .then((res) => {
                    
                      if (res.status === 200 || res.status === "ok") {
                        if(!res.data.auth){
                         // toast(res.data.message);
                          // setColor("danger");
                          // setVisible(true);
                         
                          } 
                          else{
                            // setColor("success");toast(res.data.message);
                            // setVisible(true);
                            // setuserPrsData=res.data.result[0];
                          
            
                           if(res.data.result.length>0){
                   // console.log(res.data.result[0].account_number);
                     
                            setAccountNumber(res.data.result?res.data.result[0].account_number:'');
                           
                            setGSTNumber(res.data.result?res.data.result[0].gst_in:'');
                             setACid(res.data.result[0].account_id);
                           }
                            
                          }
                      }
                    })
                   
            
            
            
            
               
          },[]);

        console.log(props.location.state.accountDetails);
       
    //   }
     
   const   history = useHistory();
   
    
        // const history = useHistory();
        const username = localStorage.getItem('userName');
        const userId = localStorage.getItem('userid');
       
          //accountDetails
//   const accountDetails = (props.location.state) ? props.location.state.accountDetails : "";

// contact_number: null
// creationtime: "2021-07-24T07:35:18.000Z"
// creator: null
// email: "jhj"
// firstname: "hjh"
// isauth: null
// lastname: "jhj"
// modificationtime: "2021-07-24T07:35:18.000Z"
// parent_id: 6
// password: "$2b$10$mQSiO2ZnUJ.9fsbRPddBr.5EeAt9TSsV9i63fsQSIh5mbk85y9nMG"
// role_fk: null
// user_pk: 7
// username: "hjh"

  const [firstName, setFirstName] = useState(userDetails.firstname);
  const [lastName, setLasttName] = useState(userDetails.lastname);
  const [email, setEmail] = useState(userDetails.email);
  const [userName, setUserName] = useState(userDetails.username);
  const [password, setPassword] = useState(userDetails.password);
  

const [tokenview, clickfortokenview] = React.useState(userDetails.permission.tokenview);
  const changeforclickfortokenview = (event) => {
   clickfortokenview(event.target.checked);
 };
 
 const [tokencreate, clickfortokencreate] = React.useState(userDetails.permission.tokencreate);
 const changeforclickfortokencreate = (event) => {
  clickfortokencreate(event.target.checked);
 };

 const [tokenapprove, clickfortokenapprove] = React.useState(userDetails.permission.tokenapprove);
 const changeforclickfortokenapprove = (event) => {
  clickfortokenapprove(event.target.checked);
 };

 const [userview, clickforuserview] = React.useState(userDetails.permission.userview);
  const changeforclickforuserview = (event) => {
   clickforuserview(event.target.checked);
 };
 
 const [usercreate, clickforusercreate] = React.useState(userDetails.permission.usercreate);
 const changeforclickforusercreate = (event) => {
  if(userDetails.isroot == "1"){
    clickforusercreate(event.target.checked);
  } else {
    clickforusercreate(false);
  }

 };

 const [userapprove, clickforuserapprove] = React.useState(userDetails.permission.userapprove);
 const changeforclickforuserapprove = (event) => {
  clickforuserapprove(event.target.checked);
 };

 const [invoiceview, clickforinvoiceview] = React.useState(userDetails.permission.invoiceview);
 const changeforclickforinvoiceview = (event) => {
   clickforinvoiceview(event.target.checked);
 };

 const [invoicecreate, clickforinvoicecreate] = React.useState(userDetails.permission.invoicecreate);
 const changeforclickforinvoicecreate = (event) => {
   clickforinvoicecreate(event.target.checked);
 };
    
 const [invoiceapprove, clickforinvoiceapprove] = React.useState(userDetails.permission.invoiceapprove);
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

          
           
          
    });


    
const { register,handleSubmit,watch,setValue,trigger  ,formState:{ errors,touchedFields }  } = useForm({
    resolver: yupResolver(validationSchema)
  }
  );
  const USERID = localStorage.getItem('userid');
  

       const onSubmit = (evt) => {
        setLoader(true)
    //    evt.preventDefault();
    
      // console.log(tokenview)
        var userLoginData = {
          firstname : firstName,
          lastname : lastName,
          email : email,
          username : userName,
          password : password,
          gst_in : gstNumber,
          accountnumber: accountNumber,
          refrencenumber : refrenceId,
          userpk : userDetails.user_pk,
          role_fk : userDetails.role_fk,
          isroot: usercreate ? 1 : null,
          parentuserpk: userDetails.parent_id ? Number(userDetails.parent_id) : Number(USERID),
          permission : JSON.stringify(permissionobj)
        }

        var userAcnData = {
           
            gst_in : gstNumber,
            accountnumber: accountNumber,
            // refrencenumber : refrenceId,
            userid : userDetails.user_pk,
            accountinfoid :acid,
            refrenceId : refrenceId
           
           
          }
          
          console.log(password)
        //console.log(permissionobj.toString())
        axios
            .post(`http://127.0.0.1:3001/api/user/updateChildUser`, userLoginData)
            .then((res) => {
              if (res.status === 200 || res.status === "ok") {
                setLoader(false)
                  
                //   history.push({
                //     pathname: "/myaccount",
                //   });
                axios
                .post(`http://127.0.0.1:3001/api/user/updateChildUserAccountDetails`, userAcnData)
                .then((res) => {
                  if (res.status === 200 || res.status === "ok") {
                      
                    //   history.push({
                    //     pathname: "/myaccount",
                    //   });
    
    
    
                    
                      toast(res.data.message);
    
                  }  
                  else
                  {
                  toast("error");
    
                  }
                })


              
                 // toast(res.data.message);

              }  
              else
              {
                setLoader(false)
              toast("error");

              }
            })
       }
       return (
            
           <> 
               {isloader ? <div className="loaderparent">
        <Loader
        type="BallTriangle"
        color="#00BFFF"
        className="spinloader"
        height={100}
        width={100}
      />
    </div> : ''}
            <div className="innerprofile">
           <Form onSubmit={handleSubmit(onSubmit)}>
        <div className=" with-space">

        <Row>
   
       
<Col sm="12" className="text-left">
  <p className="profilehead">Edit New User</p>
  
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
      label="Last Name" {...register("lname", { value: lastName })}
      onChange={(e) => setLasttName(e.target.value)} value={lastName}

    />
         
         {errors.lname ? <p class="text-danger padd-l-r-10 margin-b-0">{errors.lname.message}</p> : '' }

        </FormGroup></Col>
        </Row>
        <Row form>
				<Col md={6}>
					<FormGroup className=" input-spacing inputouter">
						<FloatingLabelInput id="example-3" label="Email" {...register("email", { value: email })} value={email}
            onChange={(e) => setEmail(e.target.value)} 
            />

         {errors.email ? <p class="text-danger padd-l-r-10 margin-b-0">{errors.email.message}</p> : '' }

					</FormGroup>
				</Col>
				<Col md={6}>


					<FormGroup className=" input-spacing inputouter">
						<FloatingLabelInput id="example-3" label="Username" {...register("uname", { value: userName })}
            onChange={(e) => setUserName(e.target.value)} value={userName}
            />
         {errors.uname ? <p class="text-danger padd-l-r-10 margin-b-0">{errors.uname.message}</p> : '' }

					</FormGroup>
				</Col>
			</Row>
      <Row form>
				<Col md={6}>
					<FormGroup className=" input-spacing inputouter">
						<FloatingLabelInput id="example-3" label="Password"  type="password"  {...register("password", { value: password })}
            onChange={(e) => setPassword(e.target.value)} value={password}
            />
         {errors.password ? <p class="text-danger padd-l-r-10 margin-b-0">{errors.password.message}</p> : '' }

					</FormGroup>
				</Col>
				<Col md={6}>

              
					<FormGroup className=" input-spacing inputouter">
						<FloatingLabelInput id="example-3" label="Account No" {...register("acn", { value: accountNumber })} value={accountNumber}
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
      label="GST IN" {...register("gstin", { value: gstNumber })} value={gstNumber}
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
      label="User Reference ID" {...register("Urid", { value: refrenceId })}
      onChange={(e) => setRefrenceId(e.target.value)} value={refrenceId}
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


          {/* <Button  type="submit" className="profilebtnreset margin-right-15">
           Reset
          </Button> */}

          <Link   to={{
    pathname: "/myaccount"}} className="profilebtncancel margin-right-15">
          Cancel
          </Link>
        </Col>
</Row>

        </Form>
        <ToastContainer />
        
        </div>
           
               {/* <h1>{  userDetails.parent_id}</h1> */}
              
              </> 
                
       );
           
                    
       }
    


export default EditAccount;
