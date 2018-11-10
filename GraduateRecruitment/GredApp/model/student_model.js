var db = require('../config/database');
var dbFunc = require('../config/db-function')


var studentModel = {
	getProfile:getProfile,
	setProfile:setProfile,
	setEducationDetail:setEducationDetail,
	setPublicationDetail:setPublicationDetail,
	setWorkExperienceDetail:setWorkExperienceDetail,
	setProgramResearchInterest:setProgramResearchInterest
}

function getProfile(data,result) {
	result(null, result);  
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

function setProgramResearchInterest(data,result) {  
	
	var userModel={
			"userId":data.userId,	
		    "program":data.program,
		    "researchArea":data.researchArea,
		    "researchDescription":data.researchDescription
	};
	  
	db.query("DELETE FROM programResearchInterest WHERE userId= " + data.userId +"", function (err, res) {
	    if(err) {
	            console.log("error: ", err);
	            result(null, err);
		    }
		    else{   
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
	 });  
	 
}

module.exports = studentModel;

