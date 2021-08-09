const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const varible = require('dotenv').config();
const transporter = require('../../core/notificationService'); 
var cors = require('cors');

var verifier = require('email-verify');
var infoCodes = verifier.infoCodes;

const con = require('../../core/conn')

router.get('/register',(req, res) => {
  res.send('yes calling.....');
});

router.use(cors({
  origin: [process.env.LOCAL_URL],
  methods: ['GET','POST'],
  credentials: true	
}));

const saltRounds = 10;

/*--User Registration--*/
router.post("/registration",(req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const email = req.body.email;

  const phone = req.body.phone;
  const role = req.body.role;
  const permission = '{"tokenview":true,"tokencreate":true,"tokenapprove":true,"invoiceview":true,"invoicecreate":true,"invoiceapprove":true,"userview":true,"usercreate":true,"userapprove":true}';
  const isroot = 1;

  bcrypt.hash(password, saltRounds, (err, hash) => {
	 if(err){
		res.json({auth: false, message: "Server Error"}); 

	     console.log("inside bcrypt>>>",err);
	 } 
	 else{
        con.query("INSERT INTO USER (username,email,contact_number,password,role_fk,permission,isroot) VALUES (?,?,?,?,?,?,?)",[username,email,phone,hash,role,permission,isroot],(err, result) => {
			if(result)
			{   

				console.log(result.insertId);
				res.json({auth: true, message: "user created successfully",result: result}); 

				con.query("INSERT INTO ACCOUNT_INFO (user_fk) VALUES (?)",[result.insertId],(err, result) => {

					if(result)
					{  

					con.query("INSERT INTO PERSONAL_INFO (account_fk) VALUES (?)",[result.insertId],(err, result) => {
					});
				}
				});


			
			}
			else{
				res.json({auth: false, message: err}); 

			}
			//  console.log("inside DB>>>",err);
			
			});
		}
  });
//   res.json({message: "user created success!"});

});

router.post("/myProfileInsert",(req, res) => {
     const accountName = req.body.accountName;
     const panNumber = req.body.panNumber;
     const gstNumber = req.body.gstNumber;
     const accountNumber = req.body.accountNumber;
     const bankName = req.body.bankName;
     const ifscCode = req.body.ifscCode;
     const email = req.body.email;
     const primaryNumber = req.body.primaryNumber;
     const address = req.body.address;
     const city = req.body.city;
     const state = req.body.state;
     
     const userId = req.body.userid;
     
     con.query("INSERT INTO ACCOUNT_INFO (user_fk,account_name,pan_number,gst_in,account_number,bank_name,ifsc_code,email,primary_number,address,city,state) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)",[userId,accountName,panNumber,gstNumber,accountNumber,bankName,ifscCode,email,primaryNumber,address,city,state],(err, result) => {
		if(err){
			res.send({err: err});
		}
			res.json({auth: false, message: "profile updated successfully",result:result});  
	});
     
});	

router.post("/myProfileUpdate",(req, res) => {
     const accountName = req.body.accountName;
     const panNumber = req.body.panNumber;
     const gstNumber = req.body.gstNumber;
     const accountNumber = req.body.accountNumber;
     const bankName = req.body.bankName;
     const ifscCode = req.body.ifscCode;
     const email = req.body.email;
     const primaryNumber = req.body.primaryNumber;
     const address = req.body.address;
     const city = req.body.city;
     const state = req.body.state;
     const companyName = req.body.companyName;
     
     const userId = req.body.userid;

	
     
     con.query('UPDATE ACCOUNT_INFO SET account_name = ?,pan_number = ?,gst_in = ?,account_number = ?,bank_name = ?,ifsc_code = ?,email = ?,primary_number = ?,address = ?,city = ?,state = ?,companyname = ? WHERE user_fk =?;', [accountName,panNumber,gstNumber,accountNumber,bankName,ifscCode,email,primaryNumber,address,city,state,companyName,userId],(err, result) => {
		if(err){
			res.send({err: err});
		}
			res.json({auth: true, message: "profile updated successfully",result:result});  
	});
     
});	

router.post("/personalInfoInsert",(req, res) => {
     const personName = req.body.personName;
     const personDesignation = req.body.personDesignation;
     const personEmail = req.body.personEmail;
     const personPrimaryNumber = req.body.personPrimaryNumber;
     
     const myaccountId = req.body.insertId;
     
     con.query("INSERT INTO PERSONAL_INFO (name,designation,email,primary_number,account_fk) VALUES (?,?,?,?,?)",[personName,personDesignation,personEmail,personPrimaryNumber,myaccountId],(err, result) => {
		if(err){
			res.send({err: err});
		}
			res.json({auth: true, message: "personal details updated successfully",result:result});  
	});
});	

router.post("/personalInfoUpdate",(req, res) => {
     const personName = req.body.personName;
     const personDesignation = req.body.personDesignation;
     const personEmail = req.body.personEmail;
     const personPrimaryNumber = req.body.personPrimaryNumber;
     
     const myaccountId = req.body.insertId;

	 con.query('UPDATE PERSONAL_INFO SET name = ?,designation = ?,email = ?,primary_number = ? WHERE account_fk =?;', [personName,personDesignation,personEmail,personPrimaryNumber,myaccountId],(err, result) => {	 
		if(err){
			res.send({err: err});
		}
			res.json({auth: true, message: "personal details updated successfully",result:result});  
	});
});	


router.post("/insertChildUser",(req, res) => {
     const firstname = req.body.firstname;
     const lastname = req.body.lastname;
     const email = req.body.email;
     const username = req.body.username;
     const password = req.body.password;
     const gstnumber = req.body.gst_in;
     const accountnumber = req.body.accountnumber;
     const refrencenumber = req.body.refrencenumber;
     const permission = req.body.permission;
          
     const parentid = req.body.userpk;
     const roleid = req.body.role_fk;
     const isroot = req.body.isroot;
      bcrypt.hash(password, saltRounds, (err, hash) => {
	 if(err){
		res.json({auth: false, message: "Server Error"}); 

	    console.log("inside bcrypt>>>",err);
	 } 
	 else{ 
      con.query("INSERT INTO USER (firstname,lastname,email,username,password,parent_id,role_fk,permission,isroot) VALUES (?,?,?,?,?,?,?,?,?)",[firstname,lastname,email,username,hash,parentid,roleid,permission,isroot],(err, result) => {
		if(err){
			res.send({err: err});
		}

else{
		
		con.query("INSERT INTO ACCOUNT_INFO (user_fk,gst_in,account_number) VALUES (?,?,?)",[result.insertId,gstnumber,accountnumber],(err, result) => {

			if(result)
			{  

			con.query("INSERT INTO PERSONAL_INFO (account_fk) VALUES (?)",[result.insertId],(err, result) => {
			});
		}
		});
			res.json({auth: false, message: "child user created successfully",result:result});  
	}
	 });
	}
  });
});	

router.post("/updateChildUser",(req, res) => {
     const firstname = req.body.firstname;
     const lastname = req.body.lastname;
     const email = req.body.email;
     const username = req.body.username;
     const password = req.body.password;
     const gstnumber = req.body.gst_in;
     const accountnumber = req.body.accountnumber;
     const refrencenumber = req.body.refrencenumber;
     const permission = req.body.permission;
          
     const userpk =   req.body.userpk;   
     const parent_id = req.body.parentuserpk;
     const roleid = req.body.role_fk;
     const isroot = req.body.isroot;
    //  bcrypt.hash(password, saltRounds, (err, hash) => {
	 //if(err){
		//res.json({auth: false, message: "Server Error"}); 

	    //console.log("inside bcrypt>>>",err);
	 //} 
	 //else{
	  con.query('UPDATE USER SET firstname = ?,lastname = ?,email = ?,username = ?,parent_id = ?,role_fk = ?,permission = ?,isroot = ?,refrenceid = ? WHERE user_pk =?;', [firstname,lastname,email,username,parent_id,roleid,permission,isroot,refrencenumber,userpk],(err, result) => {	  
      if(err){
			res.send({err: err});
		}
			res.json({auth: false, message: "child user created successfully",result:result});  
	   
	 //});
	//}
  });
});	

router.post("/insertChildUserAccountDetails",(req, res) => {
	const gstnumber = req.body.gst_in;    
	const accountnumber = req.body.accountnumber;
	
	const userid = req.body.userid;
	
    con.query("INSERT INTO ACCOUNT_INFO (user_fk,gst_in,account_number) VALUES (?,?,?)",[userid,gstnumber,accountnumber],(err, result) => {
		if(err){
			res.send({err: err});
		}
			res.json({auth: false, message: "profile updated successfully",result:result});  
	});
});	

router.post("/updateChildUserAccountDetails",(req, res) => {
	const gstnumber = req.body.gst_in;    
	const accountnumber = req.body.accountnumber;
	
	const userid = req.body.userid;
	const accountinfoid = req.body.accountinfoid;
	const refrenceId = req.body.refrenceId;
	
    con.query('UPDATE ACCOUNT_INFO SET gst_in = ?,account_number = ?, refrenceid = ? WHERE user_fk =? and account_id = ?;', [gstnumber,accountnumber,refrenceId,userid,accountinfoid],(err, result) => {
		if(err){
			res.send({err: err});
		}
			res.json({auth: true, message: "profile updated successfully",result:result});  
	});
});	

router.post("/setUserPermission",(req, res) => {
	const userpermission = req.body.permission;
	const userid = req.body.userid;
	con.query('UPDATE USER SET permission = ? WHERE user_pk =?;', [userpermission, userid],(err, result) => {
	   if(err){
	     res.send({err: err});
	   }
	     res.json({auth: false, message: "permissoin upadated", result : result});
	});	
});	

router.post("/sendMail",(req, res) => {
	verifier.verify( req.body.email, function( err, info ){
  if(info.success){
     const emails = req.body.email;
     const name = req.body.name;
     const token = req.body.token;
     
     var message = "<p> Hi User </p><br><p>   This is your valid token " + token + " and this is valid for five minutes only</p><br>Thanks<br>Admin";
     var mailOptions = {
		from: 'gour.ankit40@gmail.com',
		to: emails,
		subject: 'T-assets | Token Varification',
		//text: message 
		html: message        
    };
    
	transporter.sendMail(mailOptions, function(error, info){
		if (error) {
			res.send({err: error});
		} else {
			res.json({auth: false, message: "mail sent"}); 
      }
	});
  } else {
      res.json({auth: false, message: "mail not sent"});
  }	
  });	
});

router.get("/getAllParentUser",(req, res) => {
	con.query('SELECT * from USER where role_fk != 3 and parent_id IS NULL;',(err, result) => {
	 if(err){
	     res.send({err: err});
	 }
	    res.json({auth: true, message: "success", result: result});  
   });
	
});
router.post("/getAllChildUser",(req, res) => {
	const parentid = req.body.parentid;
	const userid = req.body.userid;
	con.query('SELECT * from USER where parent_id = ? and user_pk != ?;',[parentid,userid],(err, result) => {
	 if(err){
	     res.send({err: err});
	 }
	    res.json({auth: true, message: "success", result: result});  
   });
	
});
router.post("/getAllChildUserWithoutRoot",(req, res) => {
	const parentid = req.body.parentid;
	const userid = req.body.userid;
	con.query('SELECT * from USER where parent_id = ? and isroot IS NULL and user_pk != ?;',[parentid,userid],(err, result) => {
	 if(err){
	     res.send({err: err});
	 }
	    res.json({auth: true, message: "success", result: result});  
   });
	
});

router.post("/approveUser",(req, res) => {
	const email = req.body.email;
	const status = req.body.status == 'approved' ? 1 : 0;
	con.query('UPDATE USER SET isauth = ? WHERE email =?;', [status, email],(err, result) => {
	   if(err){
	     res.send({err: err});
	   }
	     res.json({auth: true, message: "user upadated", result : result});
	});	
});	

router.post("/updatePassword",(req, res) => {
	  const email = req.body.email;
      const password = req.body.password;
  bcrypt.hash(password, saltRounds, (err, hash) => {   
    if(err){
		res.json({auth: false, message: "Server Error"}); 

	     console.log("inside bcrypt>>>",err);
	 } else {
		 console.log(hash)
       con.query('UPDATE USER SET password = ? WHERE email =?;', [hash, email],(err, result) => {
        if(err){
	     res.send({err: err});
	    }
	     res.json({auth: false, message: "password updated success"});  
	  });
    }
  });	
});

router.post("/savePasswordToken",(req, res) => {
   const email = req.body.email;
   const tokennumber = req.body.tokennumber;
   const expirytime = new Date((new Date().getTime() + 5*60000));
   con.query("INSERT INTO USERTOKEN (email,token_number,expirytime) VALUES (?,?,?)",[email,tokennumber,expirytime],(err, result) => {
     if(err){
	  res.send({err: err});
	 }
	   res.json({auth: false, message: "token saved"});  
   });
});

router.get("/getPasswordToken",(req, res) => {
   	const	key = req.query.key;
	const	value = req.query.value;  
   con.query("SELECT * from USERTOKEN WHERE "+key+" = ?;", value, (err, result) => { 
     if(err){
	  res.send({err: err});
	 }
	   res.json({auth: false, message: "validate token", result: result});  
   });
});

router.post("/getUserDetails",(req, res) => {
   	const	key = req.body.key;
	const	value = req.body.value;  
	console.log("SELECT * from USER WHERE "+key+" = ?;", value);
   con.query("SELECT * from USER WHERE "+key+" = ?;", value, (err, result) => { 
     if(err){
	  res.send({err: err});
	 }
	   res.json({auth: true, message: "user details", result: result});  
   });
});	


router.get("/getUserAccountInfo",(req, res) => {
   	const	key = req.query.key;
	const	value = req.query.value;  
   con.query("SELECT * from ACCOUNT_INFO WHERE "+key+" = ?;", value, (err, result) => { 
     if(err){
	  res.send({err: err});
	 }
	   res.json({auth: true, message: "success", result: result});  
   });
});

router.get("/getUserPersonalInfo",(req, res) => {
   	const	key = req.query.key;
	const	value = req.query.value;  
   con.query("SELECT * from PERSONAL_INFO WHERE "+key+" = ?;", value, (err, result) => { 
     if(err){
	  res.send({err: err});
	 }
	   res.json({auth: true, message: "success", result: result});  
   });
});


/*--User login--*/
router.post("/login",(req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  	

  con.query("SELECT * from USER WHERE username = ?;", username, (err, result) => { 
    if(err){
	  res.send({err: err});
	} 
	if(result.length > 0){
		//if(result[0].isauth == 0 || result[0].isauth == null){
	      //  res.json({auth: false, message: "User is not approved"}); 
	    //} else {
	  bcrypt.compare(password, result[0].password, (error, response) => {
	     if(response){
			 //----token generation
			 const id  = result[0].id;
			 const token = jwt.sign({id}, "jwtSecret", {
			    expiresIn: 300,
			 });
			 
			 //req.session.user = result[0];
			 console.log("inside post login",req.session);
		   //res.send(result);
		   res.json({auth: true, token: token, result: result ,message: "user exist"});
		 } else {
		   res.json({auth: false, message: "wrong credentials!"}); 
		 }
	  });
     //}
	} else {
	  res.json({auth: false, message: "user doesnot exist!"});
	}
  });
});


/*--User check--*/
router.get("/usercheck",(req, res) => {
	// res.send( 'Hello, this is dee from server!');
//console.log(req);
	//const username = req.body.username;
	
	const	key = req.query.key;
	const	value = req.query.value;  
		 
	

	con.query("SELECT * from USER WHERE "+key+" = ?;", value, (err, result) => { 
	//	res.end(JSON.stringify(result));  

		if(err){
		  res.send({err: err});
		} 
		if(result.length > 0){

			res.json({auth: false, message: "user exist!"});

	//console.log(response);  
//	res.end(JSON.stringify(result));  
} else {
	res.json({auth: true, message: "user doesnot exist!"});
  }
});
	//res.send(req);
});


  /*--Get Role--*/
router.get("/getrole",(req, res) => {
	
	con.query("SELECT * from USERROLE", (err, result) => { 
	
		if(err){
		  res.send({err: err});
		} 
		else {
			if(result.length > 0){

			res.json({auth: true, message: "data Found", "result":result});

} else {
	res.json({auth: false, message: "Role doesnot exist!","result":""});
  }
}
});
	
  });

router.post("/islogedin", (req, res) => {
 if(req.session.user.islogin && req.body.user){
    res.send({ loggedIn: true, user: req.session.user });
 } else {
    res.send({ loggedIn: false });
 }
});

module.exports = router;
