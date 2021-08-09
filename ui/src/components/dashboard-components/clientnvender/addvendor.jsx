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


const Addvendor = (props) => {
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
  const [gstNumber, setGSTNumber] = useState("");
  const [mob, setMobNumber] = useState("");
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
    mob: Yup.string()
    .required('Mobile No. is required'),
    gstin: Yup.string()
    .required('GST IN is required'),
   
   
  
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

        <Row>
   
       
<Col sm="12" className="text-left">
  <p className="profilehead">Add New Client / Vendor </p>
  
  </Col></Row>
        <Row form>
        <Col md={6}>

      
        <FormGroup className=" input-spacing inputouter">
        <FloatingLabelInput
      id="example-3"
      label=" Name"  
      {...register("name", { value: name })} value={name}

      onChange={(e) => setName(e.target.value)}

    />
      {errors.name ? <p class="text-danger padd-l-r-10 margin-b-0">{errors.name.message}</p> : '' }

        </FormGroup></Col>
        <Col md={6}>
        <FormGroup className="input-spacing inputouter">
        <FloatingLabelInput
      id="example-3"
      label="Pan No" 
      {...register("pan", { value: pan })} value={pan}

      onChange={(e) => setPan(e.target.value)}

    />
         
         {errors.pan ? <p class="text-danger padd-l-r-10 margin-b-0">{errors.pan.message}</p> : '' }

        </FormGroup></Col>
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
				<Col md={6}>
					<FormGroup className=" input-spacing inputouter">
						<FloatingLabelInput id="example-3" label="Primary Phone " 
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
						<FloatingLabelInput id="example-3" label="Bank Name"  
      {...register("bankname", { value: bankname })} value={bankname}
             
            onChange={(e) => setbankname(e.target.value)}
            />
         {errors.bankname ? <p class="text-danger padd-l-r-10 margin-b-0">{errors.bankname.message}</p> : '' }

					</FormGroup>
				</Col>
				<Col md={6}>
					<FormGroup className=" input-spacing inputouter">
						<FloatingLabelInput id="example-3" label="Mobile No"  
      {...register("mob", { value: mob })} value={mob}
            
            onChange={(e) => setMobNumber(e.target.value)}
            />
         {errors.mob ? <p class="text-danger padd-l-r-10 margin-b-0">{errors.mob.message}</p> : '' }

					</FormGroup>
				</Col>
			</Row>
        <Row form>
        <Col md={6}>
        <FormGroup className=" input-spacing inputouter">
        <FloatingLabelInput
      id="example-3"
      label="Email ID"
      {...register("email", { value: email })} value={email}
      onChange={(e) => setEmail(e.target.value)}
    />
         {errors.email ? <p class="text-danger padd-l-r-10 margin-b-0">{errors.email.message}</p> : '' }

        </FormGroup>
        </Col>

        <Col md={6}>
        {/* <FormGroup className=" input-spacing inputouter"> */}
        <FormControl component="fieldset">
        {/* <FormLabel component="legend">labelPlacement</FormLabel> */}
        <RadioGroup
          aria-label="position"
          name="position"
        row
        >
       
 <FormControlLabel
            value="Client"
            control={<Radio  />}
            label="Client"
            labelPlacement="Client"
          />

<FormControlLabel
            value="Vendor"
            control={<Radio  />}
            label="Vendor"
            labelPlacement="Vendor"
          />

  </RadioGroup>
      </FormControl>

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

export default Addvendor;
