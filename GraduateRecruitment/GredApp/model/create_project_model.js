var db = require('../config/database');
var dbFunc = require('../config/db-function')

var modelData = {
	getDepartmentList:getDepartmentList,
	getDepartmentBranch:getDepartmentBranch,
	setProjectDetail:setProjectDetail,
	setProjectResearchDetail:setProjectResearchDetail,
	getAddedProject:getAddedProject,
	deleteProject:deleteProject,
	publishProject:publishProject,
	getSelectedProject: getSelectedProject,
	getSelectedResearchProject:getSelectedResearchProject,
	getProgramResearchInterest:getProgramResearchInterest,
	setAssessmentData:setAssessmentData,
	getAssessment:getAssessment,
	deleteAssessment:deleteAssessment,
	getStudentSubject:getStudentSubject
}

/*function getDepartmentList(result) {
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
*/

function getDepartmentList(data,result) {
	 
    db.query("SELECT DISTINCT deptName AS DeptName FROM facultyDeptMapping where trim(facultyid) in (select trim(facultyid) as facultyid from user where id = "+ data.loginInId +")", function (err, res) {
	    if(err) {
	        console.log("error: ", err);
	        result(null, err);
	    }
	    else{   
	        result(null, res);
	    }
    });   
}

function getDepartmentBranch(data,result) { 
    db.query("SELECT DISTINCT DeptBranch FROM department WHERE DeptName='"+ data.DeptName +"'", function (err, res) {
	    if(err) {
	        console.log("error: ", err);
	        result(null, err);
	    }
	    else{  
	        result(null, res);
	    }
    });   
}

function getAddedProject(data,result) { 
    db.query("SELECT * FROM projectDetail WHERE department='"+ data.DeptName +"'", function (err, res) {
	    if(err) {
	        console.log("error: ", err);
	        result(null, err);
	    }
	    else{  
	        result(null, res);
	    }
    });   
}

function getSelectedProject(data,result) { 
    db.query("SELECT * FROM projectDetail WHERE id='"+ data.projectId +"'", function (err, res) {
	    if(err) {
	        console.log("error: ", err);
	        result(null, err);
	    }
	    else{  
	        result(null, res);
	    }
    });   
}

function getSelectedResearchProject(data,result) { 
    db.query("SELECT * FROM projectResearchDetail WHERE projectId='"+ data.projectId +"'", function (err, res) {
	    if(err) {
	        console.log("error: ", err);
	        result(null, err);
	    }
	    else{  
	        result(null, res);
	    }
    });   
}

function deleteProject(data,result) {
	console.log("data.projectId" + data.projectId);
    db.query("DELETE FROM projectDetail WHERE id="+data.projectId, function (err, res) {
	    if(err) {
	        console.log("error: ", err);
	        result(null, err);
	    }
	    else{  
	    	var sendData={
			  status:true,    
			  message:"Record deleted successfully"
			};
			result(null, sendData); 
	    }
    });   
}

function publishProject(data,result) {
    db.query("UPDATE projectDetail SET isDraft=1 WHERE id=" + data.projectId , function (err, res) {
	    if(err) {
	        console.log("error: ", err);
	        result(null, err);
	    }
	    else{  
	    	var sendData={
			  status:true,    
			  message:"Record update successfully"
			};
			result(null, sendData); 
	    }
    });   
}

function setProjectDetail(data,result) {  
	
	console.log("data.projectId :"+data.projectId);
	if(data.projectId=="")
	{
		data.projectId=0;
	}
	
	var project={
			"department":data.department,	
		    "program":data.program,
		    "degree":data.degree,
		    "programDuration":data.programDuration,
		    "programStartDate":data.programStartDate,
		    "applicationEndDate":data.applicationEndDate,
		    "numberOfPosition":data.numberOfPosition,
		    "financialSupport":data.financialSupport,
		    "otherRequirement":data.otherRequirement,
		    "isDraft":data.isDraft,
		    "createdBy":data.userId
		    
	}; 
	
	db.query("select id from projectDetail WHERE id= " + data.projectId +"", function (err, res) {
	    if(err) {
	            console.log("error: ", err);
	            result(null, err);
		    }
		    else{   
		    	
		    	if(res.length==0)
		    	{
		    		db.query("INSERT INTO projectDetail set ? " , project ,function(err,res){
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
		    		db.query("UPDATE projectDetail set department='"+data.department+"',program='"+data.program+"',degree='"+data.degree+"',programDuration='"+ data.programDuration
		    				+"',programStartDate='"+data.programStartDate+"',applicationEndDate='"+data.applicationEndDate +"',numberOfPosition='"+data.numberOfPosition 
		    				+"',financialSupport='"+data.financialSupport +"',otherRequirement='"+data.otherRequirement +"',isDraft="+data.isDraft +",createdBy='"+ data.userId+"' WHERE id="+data.projectId,function(err,res){
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

function setProjectResearchDetail(data,result) {  
	 
	var model={	
		    "projectId":data.projectId,
		    "researchTitle":data.researchTitle,
		    "researchDescription":data.researchDescription,
		    "projectFund":data.projectFund,
		    "skillSet":data.skillSet
	};
	  
	db.query("DELETE FROM projectResearchDetail WHERE projectId= " + data.projectId +"", function (err, res) {
	    if(err) {
	            console.log("error: ", err);
	            result(null, err);
		    }
		    else{		    	
		    	if(model.researchTitle!="")
		    	{
		    		console.log("sadsad dsa : dd" +data.projectId);
		    		db.query("INSERT INTO projectResearchDetail set ? " ,model,function(err,res){
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

/* start Assessment data */ 

function setAssessmentData(data,result) { 
	
	var model={	
			"term":data.term,
			"studentId":data.studentId,
		    "assignmentType":data.assignment,	
		    "subject":data.subject,
		    "marks":data.marks,
		    "outoff":data.outoff,
		    "grade":data.grade,
		    "feedback":data.feedback,
		    "createdBy":data.userId 
	};
	 
	db.query("INSERT INTO assessment set ? " , model ,function(err,res){
		if(err) {
		    console.log("error: ", err);
		    result(null,err);
		}
		else{
		    console.log(res.insertId);
		    result(null, res.insertId);
		}
   });
};

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

function getStudentSubject(data,result) { 
	console.log(" data.studentId"+ data.studentId);
	db.query("select * from registercourse WHERE studentId=" + data.studentId, function (err, res) {
	    if(err) {
	            console.log("error: ", err);
	            result(null, err);
		    }
		    else{   
		        result(null, res);
		}
	});
};

function deleteAssessment(data,result) { 
	 
    db.query("DELETE FROM assessment WHERE id="+data.id, function (err, res) {
	    if(err) {
	        console.log("error: ", err);
	        result(null, err);
	    }
	    else{  
	    	var sendData={
			  status:true,    
			  message:"Record deleted successfully"
			};
			result(null, sendData); 
	    }
    });   
}

/* end Assessment data */ 

module.exports = modelData;