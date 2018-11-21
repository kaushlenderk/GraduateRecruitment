var faculty_model = require("../model/faculty_model");
var create_project_model = require("../model/create_project_model");
var enrollment_model = require("../model/enrollment_model");

var express = require("express");
var bodyParser = require("body-parser");

var router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:false}));

/** faculty page link **/
router.get("/faculty",function(req,res){
	
	if(req.session.user === undefined) {
		res.redirect('/'); 
	} 
	
    res.render("faculty",{
        pageTitle:'Faculty Admin Page',
        pageID:'Faculty Admin Page'
    })
});

router.post("/getProfile",function(req,res){  
	faculty_model.getProfile(req.body,function(err, data) {
		if (err)
	    {
	    	throw err;
	    }
	    else
	    {  
	       res.json(data);	
	    }	      
	}); 
});

router.post("/getRegisterUserDetail",function(req,res){  
	faculty_model.getRegisterUserDetail(req.body,function(err, data) {
		if (err)
	    {
	    	throw err;
	    }
	    else
	    {  
	       res.json(data);	
	    }	      
	}); 
});

router.post("/getEducation",function(req,res){  
	faculty_model.getEducationDetail(req.body,function(err, data) {
		if (err)
	    {
	    	throw err;
	    }
	    else
	    {  
	       res.json(data);	
	    }	      
	}); 
});

router.post("/getPublication",function(req,res){  
	faculty_model.getPublicationDetail(req.body,function(err, data) {
		if (err)
	    {
	    	throw err;
	    }
	    else
	    {  
	       res.json(data);	
	    }	      
	}); 
});

router.post("/getWorkExperience",function(req,res){  
	faculty_model.getWorkExperienceDetail(req.body,function(err, data) {
		if (err)
	    {
	    	throw err;
	    }
	    else
	    {  
	       res.json(data);	
	    }	      
	}); 
});

router.post("/faculty",function(req,res){ 
	faculty_model.setProfile(req.body, function(err, data) {	    
	    if (err)
	    {
	    	throw err
	    }
	    else
	    {
	    	res.json(data);	
	    } 
	  });
});

router.post("/education",function(req,res){ 
	faculty_model.setEducationDetail(req.body, function(err, data) {	    
	    if (err)
	    {
	    	throw err
	    }
	    else
	    {
	    	res.json(data);	
	    } 
	  });
});

router.post("/publication",function(req,res){ 
	faculty_model.setPublicationDetail(req.body, function(err, data) {	    
	    if (err)
	    {
	    	throw err
	    }
	    else
	    {
	    	res.json(data);	
	    } 
	  });
});

router.post("/workExperience",function(req,res){ 
	faculty_model.setWorkExperienceDetail(req.body, function(err, data) {	    
	    if (err)
	    {
	    	throw err
	    }
	    else
	    {
	    	res.json(data);	
	    } 
	  });
});

/** create project link **/

router.post("/getDepartmentList",function(req,res){
	create_project_model.getDepartmentList(req.body, function(err, data) {	 
		if (err)
	    {
	    	throw err;
	    }
	    else
	    {  
	       //console.log(data);
	       res.json(data);	
	    }	      
	}); 
});

router.post("/getDepartmentBranch",function(req,res){
	create_project_model.getDepartmentBranch(req.body, function(err, data) {	    
	    if (err)
	    {
	    	throw err
	    }
	    else
	    {
	    	res.json(data);	
	    } 
	  });
});

router.post("/setProjectDetail",function(req,res){ ;
	create_project_model.setProjectDetail(req.body, function(err, data) {	    
	    if (err)
	    {
	    	throw err
	    }
	    else
	    {
	    	res.json(data);	
	    } 
	  });
});

router.post("/getAddedProject",function(req,res){ ;
create_project_model.getAddedProject(req.body, function(err, data) {	    
    if (err)
    {
    	throw err
    }
    else
    {
    	res.json(data);	
    } 
  });
});

router.post("/getSelectedProject",function(req,res){ ;
create_project_model.getSelectedProject(req.body, function(err, data) {	    
    if (err)
    {
    	throw err
    }
    else
    {
    	res.json(data);	
    } 
  });
});

router.post("/getSelectedResearchProject",function(req,res){ ;
create_project_model.getSelectedResearchProject(req.body, function(err, data) {	    
    if (err)
    {
    	throw err
    }
    else
    {
    	res.json(data);	
    } 
  });
});

router.post("/setProjectResearchDetail",function(req,res){
	create_project_model.setProjectResearchDetail(req.body, function(err, data) {	    
	    if (err)
	    {
	    	throw err
	    }
	    else
	    {
	    	res.json(data);	
	    } 
	  });
});

router.post("/deleteProject",function(req,res){
	create_project_model.deleteProject(req.body, function(err, data) {	    
	    if (err)
	    {
	    	throw err
	    }
	    else
	    {
	    	res.json(data);	
	    } 
	  });
});

router.post("/publishProject",function(req,res){
	create_project_model.publishProject(req.body, function(err, data) {	    
	    if (err)
	    {
	    	throw err
	    }
	    else
	    {
	    	res.json(data);	
	    } 
	  });
});

/** enrollment_model **/
 
router.post("/GetMappedStudentProfile",function(req,res){
	console.log("GetMappedStudentProfile:");
	enrollment_model.GetMappedStudentProfile(req.body,function(err, data) {
		if (err)
	    {
	    	throw err;
	    }
	    else
	    {  
	       console.log(data);
	       res.json(data);	
	    }	      
	}); 
});

router.post("/getProgramResearchInterest",function(req,res){  
	create_project_model.getProgramResearchInterest(req.body,function(err, data) {
		if (err)
	    {
	    	throw err;
	    }
	    else
	    {  
	       res.json(data);	
	    }	      
	}); 
});

router.post("/setOfferAdmissions",function(req,res){ 
	enrollment_model.setOfferAdmissions(req.body, function(err, data) {	    
	    if (err)
	    {
	    	throw err
	    }
	    else
	    {
	    	res.json(data);	
	    } 
	  });
});

router.post("/setRejectAdmissions",function(req,res){ 
	enrollment_model.setRejectAdmissions(req.body, function(err, data) {	    
	    if (err)
	    {
	    	throw err
	    }
	    else
	    {
	    	res.json(data);	
	    } 
	  });
});

/* start Assessment data */ 

router.post("/setAssessmentData",function(req,res){ ;
create_project_model.setAssessmentData(req.body, function(err, data) {	    
    if (err)
    {
    	throw err
    }
    else
    {
    	res.json(data);	
    } 
  });
});


router.post("/getAssessment",function(req,res){ ;
create_project_model.getAssessment(req.body, function(err, data) {	    
    if (err)
    {
    	throw err
    }
    else
    {
    	res.json(data);	
    } 
  });
});

router.post("/getStudentSubject",function(req,res){ ;
create_project_model.getStudentSubject(req.body, function(err, data) {	    
    if (err)
    {
    	throw err
    }
    else
    {
    	res.json(data);	
    } 
  });
}); 

router.post("/deleteAssessment",function(req,res){ ;
create_project_model.deleteAssessment(req.body, function(err, data) {	    
    if (err)
    {
    	throw err
    }
    else
    {
    	res.json(data);	
    } 
  });
});
/* end Assessment data */ 
module.exports =router; 