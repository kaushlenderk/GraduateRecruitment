var db = require('../config/database');
var dbFunc = require('../config/db-function')

var modelData = {
	GetMappedStudentProfile:GetMappedStudentProfile 
}
  

function GetMappedStudentProfile(result) {
	
	var sql="call GetMappedStudentProfile('')";
	
    db.query(sql, function (err, res) {
	    if(err) {
	        console.log("error: ", err);
	        result(null, err);
	    }
	    else{  
	        result(null, res);
	    }
    });   
}

module.exports = modelData;