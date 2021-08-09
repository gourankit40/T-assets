import React, { useState, setState }  from 'react';
import axios from "axios";

//import "./forgotpassword.css";
import { Form,FormGroup,Label,Input,TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle,CardSubtitle,CardGroup, CardText,CardBody, Row, Col } from 'reactstrap';
import { Link, useHistory } from "react-router-dom";


  import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

  import Sideimage from '../../assets/images/signin.png';
  import "../../assets/scss/all/login.css";
  
  import logo from '../../assets/images/signin12.png';
  import Loader from "react-loader-spinner";

const Tokenvarification = (props) => {
    const userEmail = (props.location.state) ? props.location.state.userEmail : "";
    
    const [token, setName] = useState("");
    const [isloader, setLoader] = useState(false);
    const history = useHistory();
    
    const validateToken = (val) => {
      var currenttimestamp = new Date().getTime(); 
      var usertokentime = new Date(val).getTime();
      return (usertokentime - currenttimestamp);
    }

    const handleSubmit = (evt) => {
      setLoader(true)
      evt.preventDefault();
        const userLoginData = {
            token_number: token,
		};
	  axios.get('http://127.0.0.1:3001/api/user/getPasswordToken?key=token_number&value='+token)
      .then((res) => {
        if (res.status === 200 || res.status === "ok") {
          setLoader(false)
            if(!res.data.result[0]){
              toast('Token is not valid!')
            } else {
            console.log(res.data.result[0].expirytime)
            var tokenBool = validateToken(res.data.result[0].expirytime); 
            if(Math.sign(tokenBool) == -1){
              toast('token time expired! please regenerate it')
  
            } else {
              toast('token varified')
                       history.push({
							pathname: "/resetpassword",
							state: { userEmail: userEmail }
					  });
            } 
          }
        }
      });  
		
      //clearFields();
   }
   

   
   const clearFields = () => {
      setName("");
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
                    <Input
                      type="text" 
                      autoComplete="off" placeholder="Token"
                      onChange={(e) => setName(e.target.value)}
                      value={token}
                    />
                  </FormGroup>
              
               
                {/* Form End From Here */}

                <Row>
           
                <Col sm="6">
                <Link to="/login" className="login-btn backlink">Back</Link>
               
              
</Col>
<Col sm="6" className="text-right">
<Button variant="primary" type="submit" className="login-btn">
                    {"Varify" ? "Varify" : "Login"}
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

export default Tokenvarification;
