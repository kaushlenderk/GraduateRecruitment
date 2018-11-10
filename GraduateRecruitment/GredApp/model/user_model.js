var db = require('../config/database');
var dbFunc = require('../config/db-function')
var Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotalySecretKey');

var userModel = {
	recoverPassword:recoverPassword,
	verfiyEmail:verfiyEmail,
	verfiyFaculty:verfiyFaculty,
	registerUser:registerUser,
	verfiyCredentials:verfiyCredentials
}

function recoverPassword(data,result) {
    db.query("SELECT password FROM USER WHERE active=1 AND email= '" + data.email +"' OR id= '" + data.memorialNumber +"'", function (err, res) {
	    if(err) {
	            console.log("error: ", err);
	            result(null, err);
		    }
		    else{    
		    	if(res!=null && res.length==0)
		    	{
		    		var sendData={
					    status:false,    
				        message:"Invalid memorial id or email"
					};
		    		result(null, sendData);  
		    	}
		    	else
		    	{
		    		const decryptedPwd = cryptr.decrypt(res[0].password); 
			    	var sendData={
			          status:true,    
			          password:decryptedPwd
			        };
			        result(null, sendData);  
		    	}
		    	
		    }
	    });   
};

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
    
	var user={
	    "firstName":data.firstName,
	    "lastName":data.lastName,
	    "email":data.email,
	    "facultyId":data.facultyid,
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


function verfiyCredentials(data,result) {
	var memorialNumber=data.memorialNumber;
    var password=data.password;
	  
    db.query('SELECT id as memorialNumber, firstName,lastName,email,facultyId,password FROM user WHERE id = ?',[memorialNumber], function (error, results, fields) {
    	
    	if (error) { 
              var sendData={
               	 status:false,    
                 message:"there are some error with query"
              };
              result(null, sendData);   
        }else{
         
          if(results.length >0){ 
        	  
        	  const decryptedPwd = cryptr.decrypt(results[0].password);
        	   
              if(password==decryptedPwd || password == results[0].password){
            	  var sendData={
                      status:true,    
                      data:results
                  }; 
            	  result(null, results);
              }else{ 
            	  var sendData={
                  	 status:false,    
                     message:"Invalid user id and password."
              	  };
                  result(null, sendData);  
              }            
          }
          else{ 
            var sendData={
            		status:false,    
                    message:"Invalid user id and password."
        	};
            result(null, sendData);         	  
          }
        }
      }); 
};

module.exports = userModel;