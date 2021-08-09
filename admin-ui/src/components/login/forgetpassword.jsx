import React, { useState, setState }  from 'react';
import axios from "axios";

//import "./forgotpassword.css";
import { Form,FormGroup,Label,Input,TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle,CardSubtitle,CardGroup, CardText,CardBody, Row, Col } from 'reactstrap';
import { Link, useHistory } from "react-router-dom";

import Sideimage from '../../assets/images/signin.png';
import "../../assets/scss/all/login.css";
  import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';



const Forgetpassword = (props) => {
   
    const [email1, setName] = useState("");
    const history = useHistory();

    const handleSubmit = (evt) => {
      evt.preventDefault();
        const userLoginData = {
            email: email1,
		};
		if(!email1){
		  toast('Please enter email!')
		  return false;
		}  
         axios.get('http://127.0.0.1:3001/api/user/usercheck?key=email&value='+email1).then((res) => {
            if (res.status === 200 || res.status === "ok") {
              if(res.data.message != "user doesnot exist!"){
              var validToken = Math.floor(Math.pow(10, 4-1) + Math.random() * (Math.pow(10, 4) - Math.pow(10, 4-1) - 1))
              var mailObj = {
                 email : email1,
                 token : validToken
              }
              //sent mail code start
            axios.post('http://127.0.0.1:3001/api/user/sendMail',mailObj).then((res) => {
              if (res.status === 200 || res.status === "ok") {
               toast("email sent.")
               var tokenData = {
                  email : email1,
                  expirytime : new Date((new Date().getTime() + 5*60000)),
                  tokennumber : validToken
               }
               axios.post('http://127.0.0.1:3001/api/user/savePasswordToken',tokenData).then((res) => {
                 if (res.status === 200 || res.status === "ok") {
                   if(res.data.message == "token saved"){
                      
                      history.push({
							pathname: "/varifytoken",
							state: { userEmail: email1 }
					  });
					  toast("token saved")
                   }
				 }	
				}).catch((err) => {
				if (err.response) {}
					return console.log("No Error Found");
				});
			  }
			}).catch((err) => {
					if (err.response) {}
						return console.log("No Error Found");
			});
				//sent mail code end
              } else {
                toast('User does not exists!')
              }
            }
         }).catch((err) => {
              if (err.response) {}
              return console.log("No Error Found");
         });
      //clearFields();
   }
   

   
   const clearFields = () => {
      setName("");
   };
  // let blank = "BLANK";
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
                <Form  onSubmit={handleSubmit}>
                  <FormGroup className="m-0 input-spacing">
                    {/* <Label className="input-title">
                      Email Address
                    </Label> */}
                    <Input
                      type="email" 
                      autoComplete="off" placeholder="Email"
                      onChange={(e) => setName(e.target.value)}
                      value={email1}
                    />
                  </FormGroup>
              
               
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

 <ToastContainer />

    </>
  );
};

export default Forgetpassword;
