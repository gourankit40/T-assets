import React, { useState }  from 'react';
// import { Form } from "react-bootstrap";
import { Form,FormGroup,Label,input,TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import axios from "axios";
import {BrowserRouter as Router, Switch, Route, Link, useHistory } from "react-router-dom";

import profilephoto from '../../assets/images/users/1.jpg';
import "../../assets/scss/all/login.css";
 import Login from '../login/login.jsx';
import Forgetpassword from '../login/forgetpassword.jsx';

import Signup from '../login/signup.jsx';

/*--------------------------------------------------------------------------------*/
/* Import images which are need for the HEADER                                    */
/*--------------------------------------------------------------------------------*/
import logodarkicon from '../../assets/images/logo-icon.png';
import logolighticon from '../../assets/images/logo-light-icon.png';
import logodarktext from '../../assets/images/logo-text.png';
import logolighttext from '../../assets/images/logo-light-text.png';

const LoginBase = () => {

    /*--------------------------------------------------------------------------------*/
    /*To open SIDEBAR-MENU in MOBILE VIEW                                             */
    /*--------------------------------------------------------------------------------*/
    const [activeTab, setActiveTab] = useState('1');

    const toggle = tab => {
      if(activeTab !== tab) setActiveTab(tab);
    }

  
  
    return (
       <>

<div className="login">
        <div className="row col-12 m-0 p-0">
          <div className="col-7 img-sec">
              
            <img src alt="login Img" className="image" />
          </div>
          <div className="col content-center">
          
          </div>
    </div>
      </div>
 
       </>
    );
}
export default LoginBase;
