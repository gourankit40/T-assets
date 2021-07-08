import React, { useState,useEffect  } from 'react';
import ReactDOM from 'react-dom';
import { Form,FormGroup,Label,Input,TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

import { Link,useHistory } from "react-router-dom";


//import signUpImage from "../../assets/images/signup.svg";
import Sideimage from '../../assets/images/signin.png';
import "../../assets/scss/all/login.css";
import axios from "axios";
import { useForm } from "react-hook-form";

import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

const Signup = () => {
 


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

  const [role, setrole] = useState("");
  
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
    // setRole(rolelist.data);
  }, []);
  

  const [showError, setError] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [loginstatus, setLoginStatus] = useState(false);

  


  const onSubmit = (evt) => {
    //evt.preventDefault();
  
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
        console.log(res);
        setLoading(true);
        if (res.status === 200 || res.status === "ok") {
          //localStorage.setItem("token", res.data.token);
          setLoading(false);
          if(!res.data.auth){
          setError("User exists");
           
          } else {
            axios.post('http://127.0.0.1:3001/api/user/registration', userLoginData)
            .then((res) => {

              if (res.status === 200 || res.status === "ok") {
                if(!res.data.auth){
                  setError(res.data.message);
                   
                  } 
                  else{
                    history.push({
                      pathname: "/dashboard",
                    });
                    return console.log(res.data.message);

                  }
              }

            })
            .catch((err) => {
              if (err.response) {
                setError(err.response.data.error);
                // clearFields();
              }
              return console.log("No Error Found");
            });

            

            
           
          }
        }
        return console.log("Something Went Wrong");
      })
      .catch((err) => {
        if (err.response) {
          setError(err.response.data.error);
          // clearFields();
        }
        return console.log("No Error Found");
      });
  };

 


  return (
      <>
   
    <div className="login" >
        <div className="row col-12 m-0 p-0">
          <div className="col-6 img-sec">
              
            <img src={Sideimage} alt="login Img" className="image" />
          </div>
          <div className="col content-center">

          <Row>
            <Col sm="12">
          
            <div className="logintabcontent">
             
              <div>
                {/* Form Start From Here */}
                <Form onSubmit={handleSubmit(onSubmit)}>
                <div className=" no-space">

                <FormGroup>
        {/* <Label for="exampleSelectMulti">Select Multiple</Label> */}
        <Input type="select"  placeholder="Select Role" onChange={(e) => setrole(e.target.value)} {...register("roleu")}>
        <option value="">Select Role</option>

         {rolelist.map((prop, key) => {
       
     return  <option value={prop.role_id}>{prop.rolename}</option>
      })} 
         
        </Input>
       
      </FormGroup>
                <FormGroup className="m-0 input-spacing">
                  {/* <Label className="input-title">First Name</Label> */}
                  <Input type="text" autocomplete="off"  placeholder="User Name"   onChange={(e) => setName(e.target.value)} {...register("username")}/>
                 
                  {/* {console.log(errors.username)} */}
                </FormGroup>
                <FormGroup className="m-0 input-spacing">
                  {/* <Label className="input-title">Email Address</Label> */}
                  <Input type="text" name="email" autocomplete="off" placeholder="Email Address"  onChange={(e) => setEmail(e.target.value)} {...register("email")}/>
                  
                   {/* <p>  {errors.email && "Enter  Email"}  </p>  */}
                {/* <p>  {errors.email.type=== 'pattern' && "Enter valid Email"}  </p> */} 

                </FormGroup>
                <FormGroup className="m-0 input-spacing">
                  {/* <Label className="input-title">Last Name</Label> */}
                  <Input type="phone" name="phone" autocomplete="off" placeholder="Phone" onChange={(e) => setPhone(e.target.value)}  {...register("phone")}/>

                  {/* <p>  {errors.phone && "Enter  Phone Number"}  </p>  */}

                </FormGroup>
              </div>
              <div className="no-space">
              
                <FormGroup className="m-0 input-spacing">
                  {/* <Label className="input-title">Password</Label> */}
                  <Input type="password" name="password" autocomplete="off" placeholder="Password" onChange={(e) => setPassword(e.target.value)}  {...register("password")}/>
                  {/* <p>  {errors.password && "Enter Password"}  </p>  */}

                </FormGroup>
                <FormGroup className="m-0 input-spacing">
                  {/* <Label className="input-title">
                    Confirm Password
                  </Label> */}
                  <Input type="password" name="cpassword" autocomplete="off" placeholder=" Confirm Password" onChange={(e) => setcPassword(e.target.value)}  {...register("cpassword")}/>
                  {/* <div className="invalid-feedback">{errors.cpassword}</div> */}

                  {/* <p>  {errors.cpassword?.message }  </p>  */}

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
            </div>
      
    
    </Col>
          </Row>
        
 </div></div></div>

    
    </>
  );
};

export default Signup;
