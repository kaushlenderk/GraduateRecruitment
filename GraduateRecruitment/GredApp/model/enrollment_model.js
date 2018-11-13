var db = require('../config/database');
var dbFunc = require('../config/db-function')

var modelData = {
	GetMappedStudentProfile:GetMappedStudentProfile,
	setOfferAdmissions:setOfferAdmissions,
	setRejectAdmissions:setRejectAdmissions
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
};

function setRejectAdmissions(data,result) { 
	
	db.query("UPDATE enrollment SET offerStatus=2,status=2 WHERE id= '" + data.id +"'", function (err, res) {
	    if(err) {
	            console.log("error: ", err);
	            result(null, err);
		    }
		    else{   
		    	var sendData={
				 status:true,    
				 message:"Reject addmission"
		       };
			  result(null, sendData);  
		}
	}); 
};



module.exports = modelData;