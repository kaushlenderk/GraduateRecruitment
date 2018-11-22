var db = require('../config/database');
var dbFunc = require('../config/db-function')


var studentModel = {
	getProfile:getProfile,
	getEducationDetail:getEducationDetail,
	getPublicationDetail:getPublicationDetail,
	getWorkExperienceDetail:getWorkExperienceDetail,
	getProgramResearchInterest:getProgramResearchInterest,
	setProfile:setProfile,
	setEducationDetail:setEducationDetail,
	setPublicationDetail:setPublicationDetail,
	setWorkExperienceDetail:setWorkExperienceDetail,
	setProgramResearchInterest:setProgramResearchInterest,
	getResearchTitle:getResearchTitle,
	GetStudentOfferAdmissionDetail:GetStudentOfferAdmissionDetail,
	setAcceptAdmissions:setAcceptAdmissions,
	setRejectAdmissionsOffer:setRejectAdmissionsOffer,
	GetStudentProgramDetail:GetStudentProgramDetail,
	getEnrollmentStatus:getEnrollmentStatus,
	deleteRegisterCourses:deleteRegisterCourses,
	setRegisterCourses:setRegisterCourses,
	getRegisterCourses:getRegisterCourses,
	getAssessment:getAssessment,
	getRegisterUserDetail:getRegisterUserDetail,
	deleteProgramResearchInterest:deleteProgramResearchInterest
}

function getRegisterUserDetail(data,result)
{
	 db.query("SELECT id,firstName,lastName,email,munEmail,facultyId FROM user WHERE active=1 AND id='" + data.userId +"'", function (err, res) {
		  if(err) {
		      console.log("error: ", err);
		      result(null, err);
		  }
		  else{   
		     result(null, res);
		  }
	   });  
}

function getResearchTitle(data,result) {
	 
	db.query("SELECT DISTINCT rt.researchTitle from projectDetail p INNER JOIN projectResearchDetail rt ON " +
			" p.id=rt.projectId WHERE p.isDraft=1 AND p.degree = '" + data.degree +"'", function (err, res) {
	    if(err) {
	            console.log("error: ", err);
	            result(null, err);
		    }
		    else{   
		        result(null, res);
		}
	});
};

function getProfile(data,result) { 
	db.query("select * from userProfile WHERE userId= '" + data.userId +"'", function (err, res) {
	    if(err) {
	            console.log("error: ", err);
	            result(null, err);
		    }
		    else{   
		        result(null, res);
		}
	});
};

function getEducationDetail(data,result) { 
	db.query("select * from educationDetail WHERE userId= '" + data.userId +"'", function (err, res) {
	    if(err) {
	            console.log("error: ", err);
	            result(null, err);
		    }
		    else{   
		        result(null, res);
		}
	});
};

function getPublicationDetail(data,result) { 
	db.query("select * from publicationDetail WHERE userId= '" + data.userId +"'", function (err, res) {
	    if(err) {
	            console.log("error: ", err);
	            result(null, err);
		    }
		    else{   
		        result(null, res);
		}
	});
};

function getWorkExperienceDetail(data,result) { 
	db.query("select * from workExperienceDetail WHERE userId= '" + data.userId +"'", function (err, res) {
	    if(err) {
	            console.log("error: ", err);
	            result(null, err);
		    }
		    else{   
		        result(null, res);
		}
	});
};

function getProgramResearchInterest(data,result) { 
	db.query("select * from programResearchInterest WHERE userId= '" + data.userId +"'", function (err, res) {
	    if(err) {
	            console.log("error: ", err);
	            result(null, err);
		    }
		    else{   
		        result(null, res);
		}
	});
};


function setProfile(data,result) {  
	
	var userProfile={
			"userId":data.userId,	
		    "firstName":data.firstName,
		    "lastName":data.lastName,
		    "email":data.email,
		    "dateOfBirth":data.dateofbirth,
		    "contactNumber":data.contactnumber,
		    "address":data.address,
		    "isFinancialSupportNeed":data.isFinancialSupportNeed,
		    "isDraft":data.isDraft
	};
	  
	db.query("select userId from userProfile WHERE userId= " + data.userId +"", function (err, res) {
	    if(err) {
	            console.log("error: ", err);
	            result(null, err);
		    }
		    else{   
		    	
		    	if(res.length==0)
		    	{
		    		db.query("INSERT INTO userProfile set ? " ,userProfile,function(err,res){
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
		    	else
		    	{
		    		db.query("UPDATE userProfile set firstName='"+data.firstName+"',lastName='"+data.lastName+"',email='"+data.email+"',dateOfBirth='"+ data.dateofbirth
		    				+"',contactNumber='"+data.contactnumber+"',address='"+data.address +"',isFinancialSupportNeed="+data.isFinancialSupportNeed +",isDraft="+data.isDraft+" WHERE userId="+data.userId,function(err,res){
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
		    }
	 });  
	 
}

function StudentProfileMapping()
{
	var sql="call CreateStudentProgramMapping()";
	
    db.query(sql, function (err, res) {
	    if(err) {
	        console.log("error: ", err);
	        result(null, err);
	    }
	    else{  
	    	console.log(" kaushlender  : " + res[0]);  
	    }
    }); 
}

function setEducationDetail(data,result) {  
	
	var userModel={
			"userId":data.userId,	
		    "program":data.program,
		    "fieldOfStudy":data.fieldOfStudy,
		    "instituteNameAddress":data.instituteNameAddress,
		    "graduationDate":data.graduationDate
	};
	  
	db.query("DELETE FROM educationDetail WHERE userId= " + data.userId +"", function (err, res) {
	    if(err) {
	            console.log("error: ", err);
	            result(null, err);
		    }
		    else{		    	
		    	if(userModel.program!="")
		    	{
		    		db.query("INSERT INTO educationDetail set ? " ,userModel,function(err,res){
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
		    }
	 });  
	 
}

function setPublicationDetail(data,result) {  
	
	var userModel={
			"userId":data.userId,	
		    "publicationName":data.publicationName,
		    "publicationArea":data.publicationArea,
		    "publicationDescription":data.publicationDescription,
		    "publicationDate":data.publicationDate
	};
	  
	db.query("DELETE FROM publicationDetail WHERE userId= " + data.userId +"", function (err, res) {
	    if(err) {
	            console.log("error: ", err);
	            result(null, err);
		    }
		    else{   
		    	
		    	if(userModel.publicationName!="")
		    	{
		    		db.query("INSERT INTO publicationDetail set ? " ,userModel,function(err,res){
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
		    }
	 });  
	 
}

function setWorkExperienceDetail(data,result) {  
	
	var userModel={
			"userId":data.userId,	
		    "institution":data.institution,
		    "position":data.position,
		    "location":data.location,
		    "monthOfExperience":data.monthOfExperience
	};
	  
	db.query("DELETE FROM workExperienceDetail WHERE userId= " + data.userId +"", function (err, res) {
	    if(err) {
	            console.log("error: ", err);
	            result(null, err);
		    }
		    else{   
		    	
		    	if(userModel.institution!="")
		    	{
		    		db.query("INSERT INTO workExperienceDetail set ? " ,userModel,function(err,res){
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
		    }
	 });  
	 
}

function deleteProgramResearchInterest(data,result) {  
	
	console.log("ddd : "+  data.userId )
	db.query("DELETE FROM programResearchInterest WHERE userId= " + data.userId +"", function (err, res) {
	    if(err) {
	            console.log("error: ", err);
	            result(null, err);
		    }
		    else{   
		    	result(null, res);
		 }
	 });  
	 
}

function setProgramResearchInterest(data,result) {  
	
	var userModel={
			"userId":data.userId,	
		    "program":data.program,
		    "researchArea":data.researchArea,
		    "researchDescription":data.researchDescription,
		    "skillSet":data.skillSet 
	};
	
	if(userModel.program!="")
	{
		db.query("INSERT INTO programResearchInterest set ? " ,userModel,function(err,res){
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
}

/* Enrollment and program detail*/

function GetStudentOfferAdmissionDetail(data,result) {
	 
	var sql="call GetStudentOfferAdmissionDetail('"+data.studentId+"')";
	
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


function setAcceptAdmissions(data,result) { 
	 
	db.query("UPDATE enrollment SET status=4,acceptanceStatus=4 WHERE userId= '" + data.userId +"' and offerStatus<>2", function (err, res) {
	    if(err) {
	            console.log("error: ", err);
	            result(null, err);
		    }
		    else{   
		    	db.query("UPDATE enrollment SET status=3,acceptanceStatus=3 WHERE id= '" + data.id +"'", function (err, res) {
		    	    if(err) {
		    	            console.log("error: ", err);
		    	            result(null, err);
		    		    }
		    		    else{   
		    		    	var sendData={
		    				 status:true,    
		    				 message:"Admission acceptance sent successfully"
		    		       };
		    			  result(null, sendData);  
		    		}
		    	}); 
		}
	}); 
};

function setRejectAdmissionsOffer(data,result) { 
	
	db.query("UPDATE enrollment SET status=4,acceptanceStatus=4 WHERE id= '" + data.id +"'", function (err, res) {
	    if(err) {
	            console.log("error: ", err);
	            result(null, err);
		    }
		    else{   
		    	var sendData={
				 status:true,    
				 message:"Decline acceptance letter"
		       };
			  result(null, sendData);  
		}
	}); 
};

function getResearchTitle(data,result) {
	 
	db.query("SELECT DISTINCT rt.researchTitle from projectDetail p INNER JOIN projectResearchDetail rt ON " +
			" p.id=rt.projectId WHERE p.isDraft=1 AND p.degree = '" + data.degree +"'", function (err, res) {
	    if(err) {
	            console.log("error: ", err);
	            result(null, err);
		    }
		    else{   
		        result(null, res);
		}
	});
};

//get program detail

function GetStudentProgramDetail(data,result) {
	   
	var sql="call GetStudentProgramDetail('"+ data.id +"')";
	
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

function getEnrollmentStatus(data,result) {
	 
	db.query("SELECT * FROM enrollment where status=1 and userId =" + data.userId , function (err, res) {
	    if(err) {
	            console.log("error: ", err);
	            result(null, err);
		    }
		    else{   
		        result(null, res);
		}
	});
};

function deleteRegisterCourses(data,result)
{
	db.query("DELETE FROM registercourse where studentId=" +data.studentId,function(err,res){
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

function setRegisterCourses(data,result) { 
	
	var registerCourse={
			"studentId":data.studentId,	
		    "coursesName":data.coursesName
	}; 
    
    db.query("INSERT INTO registercourse set ? ",registerCourse,function(err,res){
		if(err) {
		    console.log("error: ", err);
		    result(null,err);
		}
		else{ 
		    result(null, res.insertId);
		}
	});
};

function getRegisterCourses(data,result)
{
	console.log("data.studentId : " + data.studentId);
	db.query("SELECT * FROM registercourse where studentId=" +data.studentId,function(err,res){
		if(err) {
		    console.log("error: ", err);
		    result(null,err);
		}
		else{ 
		    result(null, res);
		}
	}); 
}

function getAssessment(data,result) { 
	db.query("select * from assessment WHERE studentId= '" + data.studentId +"' AND subject='"+ data.subject +"' AND term='"+ data.term +"'", function (err, res) {
	    if(err) {
	            console.log("error: ", err);
	            result(null, err);
		    }
		    else{   
		        result(null, res);
		}
	});
};

module.exports = studentModel;

