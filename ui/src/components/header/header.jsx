import React, { useState }  from 'react';
import {
    Nav,
    NavItem,
    Navbar,
    NavbarBrand,
    Collapse,
    DropdownItem,
    Button,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu
} from 'reactstrap';
import { Link, useHistory } from "react-router-dom";
import profilephoto from '../../assets/images/users/d3.jpg';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';

/*--------------------------------------------------------------------------------*/
/* Import images which are need for the HEADER                                    */
/*--------------------------------------------------------------------------------*/
import logodarkicon from '../../assets/images/logo-icon.png';
import logolighticon from '../../assets/images/logo-light-icon.png';
import logodarktext from '../../assets/images/logo-text.png';
import logolighttext from '../../assets/images/logo-light-text.png';
import logo from '../../assets/images/signin12.png';

const Header = (props) => {
     //userdetails
     const history = useHistory();
     const [activeTab, setActiveTab] = useState(localStorage.getItem("userdetails")); 
      
    /*--------------------------------------------------------------------------------*/
    /*To open SIDEBAR-MENU in MOBILE VIEW                                             */
    /*--------------------------------------------------------------------------------*/
    const showMobilemenu = () => {
        document.getElementById('main-wrapper').classList.toggle('show-sidebar');
    }

    const logout = () => {
        localStorage.setItem("userdetails", '');
        localStorage.setItem("token", '');
        localStorage.setItem("userName", '');
        localStorage.setItem("userid", '');
        
        history.push({
            pathname: "/login",
            state: {  }
          });  
    }
    return (
        <header className="topbar navbarbg" data-navbarbg="skin1">
            <Navbar className="top-navbar" dark expand="md">
                <div className="navbar-header" id="logobg" data-logobg="skin6">
                    {/*--------------------------------------------------------------------------------*/}
                    {/* Logos Or Icon will be goes here for Light Layout && Dark Layout                */}
                    {/*--------------------------------------------------------------------------------*/}
                    <NavbarBrand href="/">
                        <b className="logo-icon">
<img src={logo}></img>
                        </b>
                        <span className="logo-text">
                            {/* <span style={{color:'#000'}}>T-Assets</span> */}
                        </span>
                    </NavbarBrand>
                    {/*--------------------------------------------------------------------------------*/}
                    {/* Mobile View Toggler  [visible only after 768px screen]                         */}
                    {/*--------------------------------------------------------------------------------*/}
                    {/* <button className="btn-link nav-toggler d-block d-md-none" onClick={() => showMobilemenu()}>
                        <i className="ti-menu ti-close" />
                    </button> */}
                </div>
                <Collapse className="navbarbg" navbar data-navbarbg="skin1" >
                    <Nav className="ml-auto float-right" navbar>
                        {/* <NavItem>
                            <a href="" className="mr-2" style={{ marginTop: '15px' }}>        <i className="mdi mdi-pencil-circle" />
</a>
                        </NavItem> */}
                        {/*--------------------------------------------------------------------------------*/}
                        {/* Start Profile Dropdown                                                         */}
                        {/*--------------------------------------------------------------------------------*/}
                       <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav caret className="pro-pic">
                                <NotificationsNoneIcon/>
                              
                            </DropdownToggle>
                      
                      
                        </UncontrolledDropdown>
                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav caret className="pro-pic">
                                <img
                                    src={profilephoto}
                                    alt="user"
                                    className="rounded-circle"
                                    width="31"
                                />
                              
                            </DropdownToggle>
                            <DropdownMenu right className="user-dd">
                               
                                <DropdownItem  onClick={() => { logout(); }}>
                                    <i className="fa fa-power-off mr-1 ml-1"  /> Logout
                  </DropdownItem>
      
                            </DropdownMenu>
                      
                      
                        </UncontrolledDropdown>
                      
  
                      
                        {/*--------------------------------------------------------------------------------*/}
                        {/* End Profile Dropdown                                                           */}
                        {/*--------------------------------------------------------------------------------*/}
                    </Nav>
                </Collapse>
                <p class="profilehtext">{activeTab}</p>
            </Navbar>
        </header>
    );
}
export default Header;
