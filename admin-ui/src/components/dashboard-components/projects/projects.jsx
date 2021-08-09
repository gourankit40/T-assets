import faker from 'faker';
import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
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
import axios from "axios";
  import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
const useStyles = makeStyles((theme) => ({
    table: {
      minWidth: 650,
      borderCollapse: 'separate',
     backgroundColor:'rgb(221,222,222)',
        borderSpacing:'0 15px',
    },

  
    tableContainer: {
        // borderRadius: 15,
        margin: '10px 10px',
       
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



function Projects() {
  
 

  const timeout = '';
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  var [USERS, setusers] = React.useState([]);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  let USERSMANUPULATE = [], STATUSES = ['Active', 'Pending', 'Blocked'];

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  
  
  useEffect(() => {

   // function getAllUsers(){
          axios
            .get(`http://127.0.0.1:3001/api/user/getAllParentUser`)        
            .then((res) => {
            console.log(res.data.result)
    for(let i=0;i<res.data.result.length;i++) {
        USERS[i] = {
            name: res.data.result[i].username,
            email: res.data.result[i].email,
            phone: res.data.result[i].contact_number,
            status: (res.data.result[i].isauth && res.data.result[i].isauth == 1) ? 'approved' : 'rejected'
        }
      USERSMANUPULATE.push(res.data.result[i].username);
    }
    setusers(USERS)
    let element = document.getElementsByClassName("hide-menu")[0];
                element.click()

            })
            .catch((err) => {
              if (err.response) {
                //setError(err.response.data.error);
                //clearFields();
              }
              return console.log("No Error Found");
            });
   // }
   // getAllUsers();
   
  }, [])
  
    const handleClick = (evt,txt, index) => {

     var userLoginData = {
        email : evt.email,
        status: txt
     }
	         axios
        .post(`http://127.0.0.1:3001/api/user/approveUser`,userLoginData)        
        .then((res) => {
            console.log(res.data.result);
            if(res.data.result){
                const list = [...USERS];
                let newIndex = list.findIndex((newrows)=>{
                  return newrows.email === evt.email
                 })
                 console.log(txt)
                 list[newIndex].status = txt;
                 USERS = list;
                 console.log(list)
                 setusers(USERS);
                 toast(txt + " successfully")
            } else {
                toast("Somthing went wrong")
            }
            this.getAllUsers();
           
        })
        .catch((err) => {
          if (err.response) {
            //setError(err.response.data.error);
            //clearFields();
          }
          return console.log("No Error Found");
        });
	}

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const [userName, setName] = useState("");
  
   const editIcon = (
    <Button> Approve
    </Button>
    
  );
  
     const editIcon1 = (
    <Button> Reject
    </Button>
    
  );
  

  return (
  <>
    <TableContainer component={Paper} className={classes.tableContainer}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className={classes.tableHeaderCell}>User Name</TableCell>
            <TableCell className={classes.tableHeaderCell}>Email</TableCell>
            <TableCell className={classes.tableHeaderCell}>Mobile</TableCell>
            <TableCell className={classes.tableHeaderCell}>Status</TableCell>
            <TableCell className={classes.tableHeaderCell}></TableCell>
            <TableCell className={classes.tableHeaderCell}></TableCell>
          </TableRow>
        </TableHead>
        
 
        <TableBody>


        
         {USERS.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row,i) => (
            <TableRow key={row.name} >
              <TableCell>
                  <Grid container>

                      <Grid item lg={5}>
                          <Typography className={classes.name}>{row.name}</Typography>
                      </Grid>
                  </Grid>
                </TableCell>
              <TableCell>
                  <Typography lg={5} color="primary" variant="subtitle2">{row.email}</Typography>
                </TableCell>
              <TableCell lg={5}>{row.phone}</TableCell>
              <TableCell>
                  <Typography 
                    className={classes.status}
                    style={{
                        backgroundColor: 
                        ((row.status === true && 'green') ||
                        (row.status === false && 'red') ||
                        (row.status === null && 'red'))
                    }}
                  onChange={(e) => setName(e.target.value)} >{row.status}</Typography>
                </TableCell >
                 <TableCell onClick={() => handleClick(row,'approved',i)}>
                   {editIcon}
                 </TableCell>
            <TableCell onClick={() => handleClick(row,'rejected',i)}>
            {editIcon1}
            </TableCell>
            </TableRow>
          ))}






        </TableBody>
        <TableFooter>
        <TablePagination className={classes.footCls}
            rowsPerPageOptions={[5,10, 15]}
            component="div"
            count={USERS.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
        />
        </TableFooter>
      </Table>
    </TableContainer>
     <ToastContainer />
     </>
  );


  

}

export default Projects;
