import React, {useEffect, useState} from "react"; 
import Checkbox from '@material-ui/core/Checkbox';

import { Alert,Form,FormGroup,Label,Input,TabContent, TabPane, Nav, NavItem, NavLink, Card, CardTitle, CardText, Row, Col, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Link, useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import UnCheckedIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckedIcon from '@material-ui/icons/CheckBox'
import Loader from "react-loader-spinner";

import { 
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Avatar,
    Grid,
    Typography,
    TablePagination,
    TableFooter,
    Button
 } from '@material-ui/core';
 const useStyles = makeStyles((theme) => ({
    table: {
      minWidth: 650,
      borderCollapse: 'separate',
     backgroundColor:'rgb(221,222,222)',
        borderSpacing:'0 15px',
    },

  
    tableContainer: {
        // borderRadius: 15,
//        margin: '10px 10px',
  //      maxWidth: 950,
        // backgroundColor: '#ccc',
        backgroundColor: 'rgb(221,222,222)',
    padding: '15px',
    borderRadius: '15px',
       
    },
    tableHeaderCell: {
        fontWeight: '200',
        backgroundColor: '#0D3E69',
        color: theme.palette.getContrastText(theme.palette.primary.dark),
        padding: '6px',
        fontSize:'12px',
    },
    tableRow: {
     
      borderCollapse: 'separate',
   
      borderSpacing:'0 15px',
  },
    tableCell: {
      fontWeight: '200',
      // backgroundColor: 'red',
      color: '#A5A5A5',
      // padding:0,
     fontSize:'11px',
     
  },
    avatar: {
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.getContrastText(theme.palette.primary.light)
    },
    name: {
         
        // color: theme.palette.secondary.dark
    },
    status: {
        fontWeight: 'bold',
        fontSize: '0.75rem',
        color: 'white',
        backgroundColor: 'grey',
        borderRadius: 8,
        padding: '3px 10px',
        display: 'inline-block'
    },
    footCls:
    {
 overflow:'inherit'
    }
  }));
  var approverejectArr = [];
  var approverejectindexArr = [];
const Myaccount = (props) => {
    const timeout = '';
    const classes = useStyles();
    const history = useHistory();
    const username = localStorage.getItem('userName');
    const userId = localStorage.getItem('userid');
    const USERID = localStorage.getItem('userid');
   
    var [ALLUSERS, setUSers] = useState([]);
    var [userDetails, setUSerDetails] = useState([]);

    var [userCreatePermission, setuserCreatePermission] = useState(false);
    const [isloader, setLoader] = useState(false);
    var [userApprovePermission, setuserApprovePermission] = useState(false);
    
    const changeforapprovereject = (row, i) => {
       const tempRow  = {...row};
       const list = [...ALLUSERS];
       let newIndex = list.findIndex((newrows)=>{
          return newrows.user_pk === row.user_pk
         }) 
         list[newIndex].parentCheck = !row.parentCheck;
         setApproveandRejectArr(list[newIndex].parentCheck, list[newIndex].email,row,i);
         ALLUSERS = list;
       setUSers(ALLUSERS);
    }

    const setApproveandRejectArr = (ischecked, userid, row,index) => {
      console.log(userid)
        if(ischecked){
          approverejectArr.push(userid);    
          approverejectindexArr.push(index);  
        } else {
          if(approverejectArr.indexOf(userid) != -1){
            approverejectArr.splice(approverejectArr.indexOf(userid),1);
            approverejectindexArr.splice(approverejectindexArr.indexOf(index),1);
          }
        }
    } 

    const getmultipleApprovedClicked = (status) => {
      //console.log(approverejectArr);
      const list = [...ALLUSERS];
      for(var i = 0;i<approverejectArr.length;i++){
        updateuserstatus(approverejectArr[i],status);
        list[approverejectindexArr[i]].status = (status == "approved") ? "APPROVED" : "APPROVE"; 
      } 
      ALLUSERS = list;
      setUSers(ALLUSERS);
    }

    const updateuserstatus = (id,status) => {
      setLoader(true)
      var userLoginData = {
        email : id,
        status: status,
     }
     axios
     .post(`http://127.0.0.1:3001/api/user/approveUser`,userLoginData)        
     .then((res) => {
      setLoader(false)
      //setUSers(ALLUSERS);
     })
     .catch((err) => {
      if (err.response) {
        //setError(err.response.data.error);
        //clearFields();
      }
      return console.log("No Error Found");
     });
    }
    
    useEffect(() => {
      approverejectArr = [];
      approverejectindexArr  = [];
      function getUserDetails(){
        const sendData = {
          key: 'user_pk',
          value: USERID,
         
        };
        axios
        .post('http://127.0.0.1:3001/api/user/getUserDetails',sendData)
        .then((res) => {
          if (res.status === 200 || res.status === "ok") { 
            setUSerDetails(res.data.result[0]);
     
      
      
      var accountInfo = {
        parentid : res.data.result[0].parent_id ? res.data.result[0].parent_id : USERID,
        userid:USERID
      }
      console.log(userDetails)
      var details = res.data.result[0]?res.data.result[0].permission:"";
      var userPermissions = details ? JSON.parse(details) : "";
      setuserCreatePermission(userPermissions['usercreate']);
      setuserApprovePermission(userPermissions['userview'] || userPermissions['userapprove']);
      if(userPermissions['usercreate']){
        var url  = `http://127.0.0.1:3001/api/user/getAllChildUser`;
      } else if(userPermissions['userview'] || userPermissions['userapprove']){
        var url  = `http://127.0.0.1:3001/api/user/getAllChildUserWithoutRoot`;
      }
      axios
      .post(url,accountInfo)
      .then((res) => {
        ALLUSERS = res.data.result;
        for(var i=0; i<ALLUSERS.length; i++){
          ALLUSERS[i].permission = JSON.parse(ALLUSERS[i].permission)
          ALLUSERS[i].status = ALLUSERS[i].isauth == 1 ? 'APPROVED' : 'APPROVE';
          ALLUSERS[i].parentCheck = false;
          //row.permission
        }
        setUSers(ALLUSERS)
      })
    }
  });  
}
getUserDetails();
      //getAllChildUserWithoutRoot
    }, [])

    const getNevigation = (row, i) => {
      console.log(row)
      console.log(i)
      var accountDetails = {
        row : row,
        index: i
      }
      history.push({
        pathname: "/editacount",
        state: { accountDetails: accountDetails }
      });
    }
    
	const getApprovedClicked = (row, i) => {
    setLoader(true)
   var userLoginData = {
      email : row.email,
      status: row.status == "APPROVE" ? 'approved' : 'rejected',
   }
   axios
   .post(`http://127.0.0.1:3001/api/user/approveUser`,userLoginData)        
   .then((res) => {
    setLoader(false);
     const tempRow  = {...row};
     const list = [...ALLUSERS];
	   let newIndex = list.findIndex((newrows)=>{
        return newrows.user_pk === row.user_pk
       })
       const newBoat =  tempRow.email = 'efg';      
       list[newIndex].status = row.status == "APPROVE" ? 'APPROVED' : 'APPROVE';
       ALLUSERS = list;
       setUSers(ALLUSERS);
       //toast("successfully")
      })
        
      .catch((err) => {
        if (err.response) {
          //setError(err.response.data.error);
          //clearFields();
        }
        return console.log("No Error Found");
      });
	}
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
        <div className="myaccount">
            
      
        <TableContainer component={Paper} className={classes.tableContainer}>
        <Row>
   
       
   <Col sm="4" className="text-left">
    <p className="profilehead">{username}</p>
     
     </Col>
     
     <Col sm="8" className="text-right">{
userApprovePermission ? (<Button  type="submit" className="myacaprv margin-right-15" onClick={() => {getmultipleApprovedClicked('approved')}} >
Approve
</Button>) : ""
     }


    {userApprovePermission ? (<Button  type="submit" className="myacrjct margin-right-15" onClick={() => {getmultipleApprovedClicked('rejected')}}>
           Reject
          </Button>) : ''}


      {userCreatePermission ? (<Link  to={{
     pathname: `/addacount`,
     state: { test : 'testing'}
}} className="myacedit margin-right-15">
          Add New
          </Link>) : ''}    
        </Col>
     </Row>
          <Table className={classes.table} aria-label="simple table">

            <TableBody>
            {ALLUSERS.map((row,i) => (

            <TableRow key="gh"  className="spacer">
            <TableCell className="tdbackf  chkp">
            <Label check>
            <Checkbox
                    defaultChecked

        checked={row.parentCheck}
          uncheckedIcon={<UnCheckedIcon style={{fill: "red"}} />}
          checkedIcon={<CheckedIcon style={{fill: "#0D3E69"}} />}
        inputProps={{ 'aria-label': 'primary checkbox' }}
        onChange={() => {changeforapprovereject(row,i)}}
        
      />
         
        </Label>
                    </TableCell>
                  <TableCell className="tdback">
                     <p className="margin-b-0"> <label className="tdlabel margin-b-0">Name: </label><span className="tdspan">{row.firstname}</span></p>
            <p className="margin-b-0"> <label className="tdlabel margin-b-0"> Email: </label><span className="tdspan">{row.email}</span></p>
            <p className="margin-b-0"> <label className="tdlabel margin-b-0">Refrence ID: </label><span className="tdspan">{row.refrenceid}</span></p>
                    </TableCell>
                  <TableCell>
                  <FormGroup className=" input-spacing gridtoken" check>
        <Label className="chkhead">
         
         Invoice Access
        </Label>
        
        <Label check className="chkwidth">
        <Checkbox
          defaultChecked
          color="primary"
        checked={row.permission.invoiceview}
        inputProps={{ 'aria-label': 'primary checkbox' }}
      />
         View
        </Label>

        <Label check className="chkwidth">
        <Checkbox
          defaultChecked
          color="primary"
        checked={row.permission.invoicecreate}
        inputProps={{ 'aria-label': 'primary checkbox' }}
      />
         Create
        </Label>
        <Label check className="chkwidth">
        <Checkbox
          defaultChecked
          color="primary"
        checked={row.permission.invoiceapprove}
        inputProps={{ 'aria-label': 'primary checkbox' }}
      />
         Approve
        </Label>
       
        </FormGroup>
        <FormGroup className=" input-spacing  gridtoken" check>
        <Label className="chkhead">
         
         User Access
        </Label>
        
        <Label check className="chkwidth">
        <Checkbox
          color="primary"
        checked={row.permission.userview}
        inputProps={{ 'aria-label': 'primary checkbox' }}
      />
         View
        </Label>

        <Label check className="chkwidth">
        <Checkbox
          color="primary"
        checked={row.permission.usercreate}
        inputProps={{ 'aria-label': 'primary checkbox' }}
      />
         Create
        </Label>
        <Label check className="chkwidth">
        <Checkbox
          color="primary"
        checked={row.permission.userapprove}
        inputProps={{ 'aria-label': 'primary checkbox' }}
      />
         Approve
        </Label>
       
        </FormGroup>
        <FormGroup className=" input-spacing  gridtoken" check>
        <Label className="chkhead">
         
         Token Access
        </Label>
        
        <Label check className="chkwidth">
        <Checkbox
          defaultChecked
          color="primary"
        checked={row.permission.tokenview}
        inputProps={{ 'aria-label': 'primary checkbox' }}
      />
         View
        </Label>

        <Label check className="chkwidth">
        <Checkbox
          defaultChecked
          color="primary"
        checked={row.permission.tokencreate}
        inputProps={{ 'aria-label': 'primary checkbox' }}
      />
         Create
        </Label>
        <Label check className="chkwidth">
        <Checkbox
          defaultChecked
          color="primary"
        checked={row.permission.tokenapprove}
        inputProps={{ 'aria-label': 'primary checkbox' }}
      />
         Approve
        </Label>
       
        </FormGroup>
                    </TableCell>
                 { userApprovePermission ? (<TableCell><Button  type="submit" onClick={() => {getApprovedClicked(row,i)}} className="profilebtntabel margin-right-15">
          {row.status}
          </Button></TableCell>) : ''}   
                  
               {userCreatePermission ? (<TableCell>
                     
                     <Button  type="submit" onClick={() => {getNevigation(row,i)}} className="profilebtnedit margin-right-15">
             Edit
             </Button>
                       </TableCell>) : ''}   
                    
                </TableRow>
            
              ))}
    
    
    
    
    
    
            </TableBody>
           {/* <TableFooter>
             <TablePagination className={classes.footCls}
                rowsPerPageOptions={[10, 15]}
                component="div"
                count={USERS.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
            </TableFooter> */}
          </Table>
        </TableContainer>
         
         </div>
         </>
 );
}

export default Myaccount;
