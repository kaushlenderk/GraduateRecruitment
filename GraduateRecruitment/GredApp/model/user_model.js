var db = require('../config/database');
var dbFunc = require('../config/db-function')
var Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotalySecretKey');

var userModel = {
	verfiyEmail:verfiyEmail,
	verfiyFaculty:verfiyFaculty,
	registerUser:registerUser
}


function verfiyEmail(data,result) {
    db.query("SELECT email FROM USER WHERE active=1 AND email= '" + data.email +"'", function (err, res) {
	    if(err) {
	        console.log("error: ", err);
	        result(null, err);
		    }
		    else{  
		        result(null, res);
		    }
	    });   
};

function verfiyFaculty(data,result) {
    db.query("SELECT facultyId FROM faculty WHERE active=1 AND facultyid= '" + data.facultyid +"'", function (err, res) {
	    if(err) {
	        console.log("error: ", err);
	        result(null, err);
		    }
		    else{  
		        result(null, res);
		    }
	    });   
};

function registerUser(data,result) {  
	const encryptedpwd = cryptr.encrypt(data.password); 
    //const decryptedString = cryptr.decrypt(encryptedString);
	
	console.log("password 1:" + encryptedpwd);
	
	var user={
	    "firstName":data.firstName,
	    "lastName":data.lastName,
	    "email":data.email,
	    "facultyId":data.facultyId,
	    "password":encryptedpwd
	};
	 
	
	db.query("INSERT INTO user set ? " ,user,function(err,res){
		 if(err) {
		    console.log("error: ", err);
		    result(null,err);
		 }
		 else{
		    console.log(res.insertId);
		    result(null, res.insertId);
		 }
    });
}

module.exports = userModel;