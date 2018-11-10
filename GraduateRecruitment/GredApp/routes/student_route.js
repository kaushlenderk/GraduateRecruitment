var student_model = require("../model/student_model");
var express = require("express");
var router = express.Router();

/** student page link **/
router.get("/student",function(req,res){
 
    res.render("student",{
        pageTitle:'Student Admin Page',
        pageID:'Student Admin Page'
    })
});

router.post("/student",function(req,res){ 
	student_model.setProfile(req.body, function(err, data) {	    
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
	student_model.setEducationDetail(req.body, function(err, data) {	    
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
	student_model.setPublicationDetail(req.body, function(err, data) {	    
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
	student_model.setWorkExperienceDetail(req.body, function(err, data) {	    
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

router.post("/researchInterest",function(req,res){ 
	student_model.setProgramResearchInterest(req.body, function(err, data) {	    
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


module.exports =router; 