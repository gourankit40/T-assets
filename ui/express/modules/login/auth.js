const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const varible = require('dotenv').config();
var cors = require('cors');

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

  bcrypt.hash(password, saltRounds, (err, hash) => {
	 if(err){
		res.json({auth: false, message: "Server Error"}); 

	     console.log("inside bcrypt>>>",err);
	 } 
	 else{
        con.query("INSERT INTO user (username,email,contact_number,password,role_fk) VALUES (?,?,?,?,?)",[username,email,phone,hash,role],(err, result) => {
			if(result)
			{
				res.json({auth: true, message: "user created successfully"}); 

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

/*--User login--*/
router.post("/login",(req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  con.query("SELECT * from User WHERE username = ?;", username, (err, result) => { 
    if(err){
	  res.send({err: err});
	} 
	if(result.length > 0){
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
		   res.json({auth: true, token: token, result: result });
		 } else {
		   res.json({auth: false, message: "wrong credentials!"}); 
		 }
	  });
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
		 
	

	con.query("SELECT * from User WHERE "+key+" = ?;", value, (err, result) => { 
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
	
	con.query("SELECT * from userrole", (err, result) => { 
	
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
})

module.exports = router;
