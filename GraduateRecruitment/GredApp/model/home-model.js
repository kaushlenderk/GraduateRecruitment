var db = require('../config/database');
var dbFunc = require('../config/db-function')


var modelData = {
	getDepartmentList:getDepartmentList,
	setContactUs:setContactUs
}


function getDepartmentList(result) {
    db.query("SELECT DISTINCT DeptName FROM DEPARTMENT", function (err, res) {
	    if(err) {
	        console.log("error: ", err);
	        result(null, err);
	    }
	    else{  
	        result(null, res);
	    }
    });   
}

function setContactUs(data,result) {
	//console.log("kk:" + data.name);
	db.query("INSERT INTO ContactUs(name,email,deptName,message) VALUES('" + data.name + "','" + data.email + "','" + data.department + "','" + data.message + "')",
			function(err,res){
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

module.exports = modelData;