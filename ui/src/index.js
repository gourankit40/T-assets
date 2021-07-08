import React from 'react';
import ReactDOM from 'react-dom';
// import indexRoutes from './routes/index.jsx';
// import { Router, Route, Switch } from 'react-router-dom';
// import { HashRouter } from 'react-router-dom'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Fulllayout from './layouts/fulllayout.jsx';
import './assets/scss/style.css';
import Login from 'components/login/login.jsx';
import Forgetpassword from 'components/login/forgetpassword.jsx';

import Signup from 'components/login/signup.jsx';
// import LoginBase from 'components/login/loginBase.jsx';






ReactDOM.render(
  <Router>
  
    <Switch>
   
    {/* <Route exact path="/" component={LoginBase} /> */}
    {/* <Route  path="/forgetpassword" component={Forgetpassword} />
    <Route  path="/signup" component={Signup} /> */}
   <Route exact  path="/" component={Login} />
    <Route  path="/forgetpassword" component={Forgetpassword} />
    <Route  path="/signup" component={Signup} />

    <Route  component={Fulllayout} />

   
      {/* {indexRoutes.map((prop, key) => {
        console.log(prop.path);
        return <Route path={prop.path} key={key} component={prop.component} />;
      })} */}
    </Switch>
  
  </Router>
  ,document.getElementById('root')); 
