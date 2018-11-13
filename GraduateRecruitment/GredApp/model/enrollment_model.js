var db = require('../config/database');
var dbFunc = require('../config/db-function')

var modelData = {
	GetMappedStudentProfile:GetMappedStudentProfile,
	setOfferAdmissions:setOfferAdmissions
}
  

function GetMappedStudentProfile(result) {
	
	var sql="call GetMappedStudentProfile('')";
	
    db.query(sql, function (err, res) {
	    if(err) {
	        console.log("error: ", err);
	        result(null, err);
	    }
	    else{  
	    	console.log("res:"+res);
	        result(null, res);
	        
	    }
    });   
}

function setOfferAdmissions(data,result) { 
	
	db.query("UPDATE enrollment SET status=2,offerStatus=2 WHERE userId= '" + data.userId +"'", function (err, res) {
	    if(err) {
	            console.log("error: ", err);
	            result(null, err);
		    }
		    else{   
		    	db.query("UPDATE enrollment SET offerStatus=1,status=1 WHERE id= '" + data.id +"'", function (err, res) {
		    	    if(err) {
		    	            console.log("error: ", err);
		    	            result(null, err);
		    		    }
		    		    else{   
		    		    	var sendData={
		    				 status:true,    
		    				 message:"Admission letter sent successfully"
		    		       };
		    			  result(null, sendData);  
		    		}
		    	}); 
		}
	}); 
};


module.exports = modelData;