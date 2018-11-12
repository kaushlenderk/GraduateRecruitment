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
	getSelectedResearchProject:getSelectedResearchProject
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

function getDepartmentBranch(data,result) { 
    db.query("SELECT DISTINCT DeptBranch FROM DEPARTMENT WHERE DeptName='"+ data.DeptName +"'", function (err, res) {
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
	
	console.log("researchTitle :" +data.researchTitle);
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


module.exports = modelData;