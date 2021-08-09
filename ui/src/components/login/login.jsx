import React, { useState }  from 'react';
// import { Form } from "react-bootstrap";
import { Form,FormGroup,Label,Input,TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
  import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import Sideimage from '../../assets/images/signin.png';
import "../../assets/scss/all/login.css";
import Loader from "react-loader-spinner";

import logo from '../../assets/images/signin12.png';

/*--------------------------------------------------------------------------------*/
/* Import images which are need for the HEADER                                    */
/*--------------------------------------------------------------------------------*/
import logodarkicon from '../../assets/images/logo-icon.png';
import logolighticon from '../../assets/images/logo-light-icon.png';
import logodarktext from '../../assets/images/logo-text.png';
import logolighttext from '../../assets/images/logo-light-text.png';

const Login = (props) => {

    /*--------------------------------------------------------------------------------*/
    /*To open SIDEBAR-MENU in MOBILE VIEW                                             */
    /*--------------------------------------------------------------------------------*/
    const [activeTab, setActiveTab] = useState('1');
    
    const [tabDetails, setTabInfo] = useState('1');

    const [isloader, setLoader] = useState(false);
    const toggle = tab => {
      
      if(activeTab !== tab) setActiveTab(tab);
      setTabInfo(tab)
    }

    const handleSubmit = (evt) => {

      evt.preventDefault();
      const userLoginData = {
        username: userName,
        password: password,
      };
      if(!userName || !password){
        toast('please enter valid username and password!')
        //toast("Wow so easy!");
        return false;
      }
      setLoader(true);
      axios
        .post(`http://127.0.0.1:3001/api/user/login`, userLoginData)
        .then((res) => {
          setLoader(false);
          if (res.status === 200 || res.status === "ok") {
            if(res.data.message == "user exist"){
                           let usersidentity = (activeTab == 1)  ? "Financial User" : "Enterprise User";
                           localStorage.setItem("userdetails", usersidentity);
                           localStorage.setItem("token", res.data.token);
                           localStorage.setItem("userName", res.data.result[0].username);//user_pk
                           localStorage.setItem("userid", res.data.result[0].user_pk);
              if((usersidentity == "Enterprise User" &&  res.data.result[0].role_fk == 1) || (usersidentity == "Financial User" &&  res.data.result[0].role_fk == 2)){
                history.push({
                  pathname: "/myprofile",
                  state: { userDetails: res.data.result[0] }
                });  
              } else {
                toast('login with correct domain')
              }            
            setLoading(false);
            
            } else {
             toast(res.data.message + " or password is not matched!");
             setLoading(false);
            }

          }
          return console.log("Something Went Wrong");
        })
        .catch((err) => {
          if (err.response) {
            setError(err.response.data.error);
            clearFields();
          }
          return console.log("No Error Found");
        });
    };
  
    const clearFields = () => {
      setName("");
      setPassword("");
    };
  
    const history = useHistory();
    const [token] = useState(false);
    const [userName, setName] = useState("");
    const [password, setPassword] = useState("");
    const [showError, setError] = useState("");
    const [isLoading, setLoading] = useState(false);
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
    <div className="login">
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
         
      <div>
      <Nav tabs>
        <NavItem  className="cursorpionter">
          <NavLink
             className={classnames({ active: activeTab === '1' })}
            onClick={() => { toggle('1'); }}
          >
            Financial User
          </NavLink>
        </NavItem>
        <NavItem  className="cursorpionter">
          <NavLink
            className={classnames({ active: activeTab === '2' })}
            onClick={() => { toggle('2'); }}
          >
            Enterprise User
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent className="logintabcontent" activeTab={activeTab}>
        <TabPane tabId="1">
         
          
            <div>
             
              <div>
                {/* Form Start From Here */}
                <Form onSubmit={handleSubmit}>
                  <FormGroup className="m-0 input-spacing">
                    {/* <Label className="input-title">
                      Email Address
                    </Label> */}
                    <Input
                      type="text"
                      onChange={(e) => setName(e.target.value)}
                      autoComplete="off" placeholder="User Name"
                    />
                  </FormGroup>
                  <FormGroup className="m-0 input-spacing">
                    {/* <Label className="input-title">Password</Label> */}
                    <Input
                      type="password"
                      onChange={(e) => setPassword(e.target.value)}
                      autoComplete="off" placeholder="Password"
                    />
                  </FormGroup>
                 
               
                {/* Form End From Here */}

                <Row>
           
                <Col sm="6">
               
                <div className="nt-register-txt">
                <a>Login With OTP</a>
                  {/* <span className="signup">
                  
                    <Link to="/signup">Signup</Link> 
                  </span> */}
                </div>
</Col>
<Col sm="6">
                <div className="f-password">
                  <Link to="/forgetpassword">Forgot Password?</Link>
                </div>
                </Col>
</Row>
<Button variant="primary" type="submit" className="login-btn">
                    {isLoading ? "Loading..." : "Login"}
                  </Button>
                </Form>
              </div>
            </div>
        
        </TabPane>
        <TabPane tabId="2">
         
        <div>
             
             <div>
               {/* Form Start From Here */}
               <Form onSubmit={handleSubmit}>
                 <FormGroup className="m-0 input-spacing">
                   {/* <Label className="input-title">
                     Email Address
                   </Label> */}
                   <Input
                     type="text"
                     onChange={(e) => setName(e.target.value)}
                     autoComplete="off" placeholder="User Name"
                   />
                 </FormGroup>
                 <FormGroup className="m-0 input-spacing">
                   {/* <Label className="input-title">Password</Label> */}
                   <Input
                     type="password"
                     onChange={(e) => setPassword(e.target.value)}
                     autoComplete="off" placeholder="Password"
                   />
                 </FormGroup>
                
              
               {/* Form End From Here */}

               <Row>
          
               <Col sm="6">
              
               <div className="nt-register-txt">
               <a>Login With OTP</a>
                 {/* <span className="signup">
                 
                   <Link to="/signup">Signup</Link> 
                 </span> */}
               </div>
</Col>
<Col sm="6">
               <div className="f-password">
                 <Link to="/forgetpassword">Forgot Password?</Link>
               </div>
               </Col>
</Row>
<Button variant="primary" type="submit" className="login-btn">
                   {isLoading ? "Loading..." : "Login"}
                 </Button>
               </Form>
                 
             </div>
           </div>
        </TabPane>
      </TabContent>

     
    </div>
    <ToastContainer />
    <div>
         <p class="joinnowtext">Still not part of Tassets?         
                  <Link class="logina" to={{
     pathname: `/signup`,
     state: { tabInfo : tabDetails}
}}> Join Now</Link>
         </p>
        </div>
    </Col>
          </Row>
        
 </div></div></div>
       </>
    );
}
export default Login;
