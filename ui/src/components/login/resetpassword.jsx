import React, { useState, setState }  from 'react';
import axios from "axios";

//import "./forgotpassword.css";
import { Form,FormGroup,Label,Input,TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle,CardSubtitle,CardGroup, CardText,CardBody, Row, Col } from 'reactstrap';
import { Link, useHistory } from "react-router-dom";
import Loader from "react-loader-spinner";


  import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  import Sideimage from '../../assets/images/signin.png';
  import "../../assets/scss/all/login.css";
  
  import logo from '../../assets/images/signin12.png';

const Resetpassword = (props) => {
    const userEmail = (props.location.state) ? props.location.state.userEmail : "";
    
    const [pass1, setNewPass1] = useState("");
    const [pass2, setNewPass2] = useState("");
    const [isloader, setLoader] = useState(false);

    const handleSubmit = (evt) => {
      evt.preventDefault();
      if(!pass1 || !pass2){
        toast('Please enter password before submit!')
        return false;
      }
      if(userEmail && (pass1 === pass2)){
        setLoader(true)
         var tempObj = { email: userEmail,password : pass1 };
         axios.post('http://127.0.0.1:3001/api/user/updatePassword',tempObj).then((res) => {
           if (res.status === 200 || res.status === "ok") {
            setLoader(false)
                  toast('Your password updated successfully!')
           }
         }).catch((err) => {
				if (err.response) {}
					return console.log("No Error Found");
		 });
      } else if(pass1 != pass2){
         toast("please enter both password same!")
      } else {
         toast("please first varify your email or contact to admin!")
      }
	  clearFields();
   }
   

   
   const clearFields = () => {
      setNewPass1("");
      setNewPass2("");
   };
  // let blank = "BLANK";
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
          <div className="col content-center">


          <Row>
            <Col sm="12">
        
            
     
          
            <div className="logintabcontent">
             
              <div>
                {/* Form Start From Here */}
                <Form  onSubmit={handleSubmit}>
                  <FormGroup className="m-0 input-spacing">
                    {/* <Label className="input-title">
                      Email Address
                    </Label> */}
                    <FormGroup className="m-0 input-spacing">
                    <Input
                      type="password" 
                      autoComplete="off" placeholder="New Password"
                      onChange={(e) => setNewPass1(e.target.value)}
                      value={pass1}
                    />
                    </FormGroup>
                    <FormGroup className="m-0 input-spacing">
                    <Input
                      type="password" 
                      autoComplete="off" placeholder="Conferm New Password"
                      onChange={(e) => setNewPass2(e.target.value)}
                      value={pass2}
                    />
                    </FormGroup>
                  </FormGroup>
              
               
                {/* Form End From Here */}

                <Row>
           
                <Col sm="6">
                <Link to="/login" className="login-btn backlink">Back</Link>
               
              
</Col>
<Col sm="6" className="text-right">
<Button variant="primary" type="submit" className="login-btn">
                    {"Submit" ? "Submit" : "Login"}
                  </Button>
                </Col>
</Row>

                </Form>
              </div>
            </div>
      
    
    </Col>
          </Row>
        
 </div></div></div>

 <ToastContainer />

    </>
  );
};

export default Resetpassword;
