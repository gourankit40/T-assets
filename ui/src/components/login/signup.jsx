import React, { Component ,useState,useEffect  } from 'react';
import ReactDOM from 'react-dom';
import { Alert,Form,FormGroup,Label,Input,TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

import { Link,useHistory } from "react-router-dom";
import AlertComponent from "../alert/alert-component.jsx";

  import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  import Loader from "react-loader-spinner";

//import signUpImage from "../../assets/images/signup.svg";
import Sideimage from '../../assets/images/signin.png';

import logo from '../../assets/images/signin12.png';
import "../../assets/scss/all/login.css";
import axios from "axios";
import { useForm } from "react-hook-form";

import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import OtpInput from "react-otp-input";

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const Signup = (props) => {
  //ROLE_ADMIN

  var roleStr = 1;//(props.location.state.tabInfo == 1) ? 2 : 1;
 const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [isloader, setLoader] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOtp("");
    setOpen(false);
  };

  const validateToken = (val) => {
    var currenttimestamp = new Date().getTime(); 
    var usertokentime = new Date(val).getTime();
    return (usertokentime - currenttimestamp);
  }

  const varifyOtp = () => {
    setLoader(true)
    const userLoginData = {
      token_number: otp,
};
axios.get('http://127.0.0.1:3001/api/user/getPasswordToken?key=token_number&value='+otp)
.then((res) => {
  if (res.status === 200 || res.status === "ok") {
    setLoader(false)
      if(!res.data.result[0]){
        toast('Token is not valid!')
        return false;
      } else {
      console.log(res.data.result[0].expirytime)
      var tokenBool = validateToken(res.data.result[0].expirytime); 
      if(Math.sign(tokenBool) == -1){
        toast('token time expired! please regenerate it')
        return false;
      } else {
        registeruser(); 
        return true; 
      } 
    }
  }
});  

  }

  const registeruser  = () => {
    if(!Email && !userName && !Password){
      toast("Please enter valid details");
      setColor("danger");
      return false;
    }
    setLoader(true)
    const userLoginData = {
      username: userName,
      email: Email,
      phone: Phone,
      password: Password,
      role: role,

   
    };
console.log(userLoginData);
    axios
      .get('http://127.0.0.1:3001/api/user/usercheck?key=username&value='+userName)
      .then((res) => {
        
        setLoading(true);
        if (res.status === 200 || res.status === "ok") {
          //localStorage.setItem("token", res.data.token);
          setLoading(false);
          if(!res.data.auth){
          toast(res.data.message);
          setColor("danger");
          setVisible(true);

           
          } else {
            axios .get('http://127.0.0.1:3001/api/user/usercheck?key=email&value='+Email)

            .then((res) => {

              if (res.status === 200 || res.status === "ok") {
                setLoader(false)
                if(!res.data.auth){
                  toast(res.data.message);
                  setColor("danger");
                  setVisible(true);

                  } 
                  else{
                    setLoader(true)
                    axios.post('http://127.0.0.1:3001/api/user/registration', userLoginData)
                    .then((res) => {
        
                      if (res.status === 200 || res.status === "ok") {
                        setLoader(false)
                        if(!res.data.auth){
                          toast(res.data.message);
                          setColor("danger");
                          setVisible(true);

                          } 
                          else{
                            setColor("success");
                            toast(res.data.message);
                            setVisible(true);

                            return console.log(res.data.message);
        
                          }
                      }
        
                    })
                    .catch((err) => {
                      if (err.response) {
                        toast(err.response.data.error);
                        setColor("danger");
                        setVisible(true);

                        // clearFields();
                      }
                      return console.log("No Error Found");
                    });
        



                  }
              }

            })
            .catch((err) => {
              if (err.response) {
                toast(err.response.data.error);
                setColor("danger");
                setVisible(true);

                // clearFields();
              }
              return console.log("No Error Found");
            });

           
          }
        }
        //toast("Something Went Wrong");
        
        return console.log("Something Went Wrong");
        
      })
      .catch((err) => {
        if (err.response) {
          toast(err.response.data.error);
          setColor("danger");

          // clearFields();
        }
        return console.log("No Error Found");
      });
      clearFields();
  }

  const finalSubmit = () => {
    
    if(otp.length == 6){
     
     varifyOtp();

    } else {

      //alert('please enter valid OTP')
    }
  }

  const clearAll = () => {
    setOtp("");
  }

  const [otp, setOtp] = useState("");
  
  const body = (
    <div style={modalStyle} className={classes.paper}>
      Please enter 6 digit OTP sent to your mail
      <OtpInput
        value={otp}
        onChange={(e) => setOtp(e)}
        numInputs={6}
        separator={<span>-</span>}
      />
      <button onClick={handleClose}>close</button>
      <button onClick={clearAll}>clear</button>
      <button onClick={finalSubmit}>varify</button>
      
    </div>
  );

  const [alertvisible, setVisible] = useState(false);

    const onDismiss = () => {
        setVisible(false);
    }

  const validationSchema = Yup.object().shape({
    roleu: Yup.string()
        .required('Role is required'),
    username: Yup.string()
        .required('User name is required'),
        phone: Yup.string()
        .required('Phone is required'),
   
    email: Yup.string()
        .required('Email is required')
        .email('Email is invalid'),
    password: Yup.string()
        .min(4, 'Password must be at least 4 characters')
        .required('Password is required'),
    cpassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm Password is required'),
    
});
const { register,handleSubmit,watch,formState:{ errors }  } = useForm({
  resolver: yupResolver(validationSchema)
});

const [userName, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Phone, setPhone] = useState("");
  const [Password, setPassword] = useState("");
  const [CPassword, setcPassword] = useState("");

  const [role, setrole] = useState(roleStr);
  
  // const onSubmit = data => console.log(data);
  const history = useHistory();

  const [rolelist, setData] = useState([]);

  useEffect(async () => {
     await axios
      .get("http://127.0.0.1:3001/api/user/getrole")
      .then(function(response) {

        if(!response.data.auth){
          console.log(response.data.mesage);

        }
        else{
          return setData(response.data.result);

        }
      })
      .catch(function(error) {
        console.log(error);
      });
      console.log(rolelist);
      setrole(rolelist.data);
  }, []);
  

  const [showError, setError] = useState("");
  const [showColor, setColor] = useState("");

  const [isLoading, setLoading] = useState(false);
  const [loginstatus, setLoginStatus] = useState(false);

  
   const clearFields = () => {
      setName("");
      setEmail("");
      setPhone("");
      setPassword("");
      setcPassword("");
   };

  const onSubmit = (evt) => {
    //evt.preventDefault();
   
    const userLoginData = {
      email: Email,
};
if(!Email){
toast('Please enter email!')
return false;
}  
setLoader(true)
        var validToken = Math.floor(Math.pow(10, 6-1) + Math.random() * (Math.pow(10, 6) - Math.pow(10, 6-1) - 1))
        var mailObj = {
           email : Email,
           token : validToken
        }
        //sent mail code start
      axios.post('http://127.0.0.1:3001/api/user/sendMail',mailObj).then((res) => {
        if (res.status === 200 || res.status === "ok") {
          setLoader(false)
          if(res.data.message == "mail not sent"){
            toast("please enter valid email address.")   
            
          } else {
          console.log(res)
         toast("email sent.")
         var tokenData = {
            email : Email,
            expirytime : new Date((new Date().getTime() + 5*60000)),
            tokennumber : validToken
         }
         axios.post('http://127.0.0.1:3001/api/user/savePasswordToken',tokenData).then((res) => {
           if (res.status === 200 || res.status === "ok") {
             if(res.data.message == "token saved"){
                
              handleOpen();
      toast("token saved")
             }
   }	
  }).catch((err) => {
  if (err.response) {}
    return console.log("No Error Found");
  });
}
  } else {
    setLoader(false)
    alert('not 200')
  }
}).catch((err) => {
    if (err.response) {}
      return console.log("No Error Found");
});
  //sent mail code end
        
      
  

  };

 


  return (
      <>
      {isloader ?     <div className="loaderparent">
        <Loader
        type="BallTriangle"
        color="#00BFFF"
        className="spinloader"
        height={100}
        width={100}
      />
      </div> : ''}

    <div className="login" >
      <div className="loginlogo"><img src={logo}></img></div>
    
        <div className="row col-12 m-0 p-0">
          <div className="col-6 img-sec">
              
          <img src={Sideimage} alt="login Img" className="image" />
  
  <p className="logintext">Best Invoicing</p>

  <p className="loginsubtext">Discounting platform for <br/>
  Enterprise & Landers
  </p>
          </div>
          <div className="col content-center-sighup">

          <Row>
            <Col sm="12">
          
            <div className="logintabcontent">
             
              <div>


                {/* Form Start From Here */}
                <Form onSubmit={handleSubmit(onSubmit)}>
                <div className=" no-space">

                <FormGroup>
        {/* <Label for="exampleSelectMulti">Select Multiple</Label> */}
        <Input type="select" {...register("roleu")} onChange={(e) => setrole(e.target.value)} >
        <option value="">Select User Type</option>

         {rolelist.map((prop, key) => {
       
     return  <option value={prop.role_id}>{prop.rolename}</option>
      })} 
         
        </Input>
        {errors.roleu ? <p class="text-danger">{errors.roleu.message}</p> : '' }
      </FormGroup>
                <FormGroup className="m-0 input-spacing">
                  {/* <Label className="input-title">First Name</Label> */}
                  <Input type="text" autocomplete="off" {...register("username")}  placeholder="User Name"   onChange={(e) => setName(e.target.value)}  value={userName}/>
                  {errors.username ? <p class="text-danger">{errors.username.message}</p> : '' }

                  {/* {console.log(errors.username)} */}
                </FormGroup>
                <FormGroup className="m-0 input-spacing">
                  {/* <Label className="input-title">Email Address</Label> */}
                  <Input type="text" name="email" autocomplete="off" {...register("email")} placeholder="Email Address"  onChange={(e) => setEmail(e.target.value)} value={Email} />
                  
                  {errors.email ? <p class="text-danger">{errors.email.message}</p> : '' }


                </FormGroup>
                <FormGroup className="m-0 input-spacing">
                  {/* <Label className="input-title">Last Name</Label> */}
                  <Input type="phone" name="phone"  {...register("phone")} autocomplete="off" placeholder="Phone" onChange={(e) => setPhone(e.target.value)} value={Phone}/>

                  {/* <p>  {errors.phone && "Enter  Phone Number"}  </p>  */}
                  {errors.phone ? <p class="text-danger">{errors.phone.message}</p> : '' }

                </FormGroup>
              </div>
              <div className="no-space">
              
                <FormGroup className="m-0 input-spacing">
                  {/* <Label className="input-title">Password</Label> */}
                  <Input type="password" {...register("password")} name="password" autocomplete="off" placeholder="Password" onChange={(e) => setPassword(e.target.value)}  value={Password}/>
                  {/* <p>  {errors.password && "Enter Password"}  </p>  */}
                  {errors.password ? <p class="text-danger">{errors.password.message}</p> : '' }

                </FormGroup>
                <FormGroup className="m-0 input-spacing">
                  {/* <Label className="input-title">
                    Confirm Password
                  </Label> */}
                  <Input type="password" name="cpassword" {...register("cpassword")} autocomplete="off" placeholder=" Confirm Password" onChange={(e) => setcPassword(e.target.value)}  value={CPassword}/>
                  {errors.cpassword ? <p class="text-danger">{errors.cpassword.message}</p> : '' }
                 

                </FormGroup>
              </div>
              
               
                {/* Form End From Here */}

                <Row>
           
                <Col sm="6">
                <Link to="/login" className="login-btn backlink">Back</Link>
               
              
</Col>
<Col sm="6" className="text-right">
<Button variant="primary" type="submit" className="login-btn">
                    {"Send" ? "Send" : "Login"}
                  </Button>
                </Col>
</Row>

                </Form>
              </div>
              <ToastContainer />
            </div>
      
    
    </Col>
          </Row>
        
 </div></div></div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    
    </>
  );
};

export default Signup;
