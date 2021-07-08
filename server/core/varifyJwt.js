const jwt = require('jsonwebtoken');

const varifyJWT = (req, res, next) => {
  const token =  req.headers["x-access-token"];
  if(!token){
    console.log('please give token to us...');  
  } else {
    jwt.verify(token, "jwtSecret", (err, decoded) => {
	 if(err){
	   res.json({ auth: false, message: "u failed to authenticate!" });
	 } else {
	   req.userId = decoded.id;
	   next();
	 }
	});
  }
}

module.exports = varifyJWT;
