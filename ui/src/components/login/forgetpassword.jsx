import React, { useState }  from 'react';

//import "./forgotpassword.css";
import { Form,FormGroup,Label,Input,TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle,CardSubtitle,CardGroup, CardText,CardBody, Row, Col } from 'reactstrap';
import { Link, useHistory } from "react-router-dom";

import Sideimage from '../../assets/images/signin.png';
import "../../assets/scss/all/login.css";


const Forgetpassword = () => {
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
                <Form >
                  <FormGroup className="m-0 input-spacing">
                    {/* <Label className="input-title">
                      Email Address
                    </Label> */}
                    <Input
                      type="email" 
                      autoComplete="off" placeholder="User Name"
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



    </>
  );
};

export default Forgetpassword;
