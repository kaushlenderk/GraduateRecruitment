var express = require("express");
var user_model = require("../model/user_model");
var bodyParser = require("body-parser");

var router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:false}));


/** Login page link **/
router.get("/login",function(req,res){
 
    res.render("login",{
        pageTitle:'Login',
        pageID:'login'
    })
});

router.post("/verfiyCredentials",function(req,res){
	user_model.verfiyCredentials(req.body, function(err, data) {	    
	    if (err)
	    {
	    	throw err
	    }
	    else
	    {
	    	if (typeof(data.errno) != "undefined" &&  data.errno!="") {
	 			var abc="";
	 		}
	 		else {
	 			if(data.status!=false)
	 			{
	 				req.session.user = data; 
	 				console.log("Session Email:"+req.session.user[0].email);  
	 			} 
	 		}
	    	 
	    	res.json(data);	
	    	
	    } 
	  });
});

/* log out */
router.get('/logout', function(req, res) { 
	 req.session.reset();
	 res.redirect('/');
});


/** Create new account page link **/
router.get("/signup",function(req,res){
 
    res.render("signup",{
        pageTitle:'Create Account',
        pageID:'signup'
    })
});


router.post("/verfiyEmail",function(req,res){  
	user_model.verfiyEmail(req.body,function(err, data) {
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

router.post("/verfiyFaculty",function(req,res){  
	user_model.verfiyFaculty(req.body,function(err, data) {
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

router.post("/registerUser",function(req,res){
	user_model.registerUser(req.body, function(err, data) {	    
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

/** recover password **/

router.get("/request_password",function(req,res){	 
    res.render("request_password",{
        pageTitle:'Request Password',
        pageID:'Request Password'
    })
});

router.post("/recoverPassword",function(req,res){  
	user_model.recoverPassword(req.body,function(err, data) {
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

module.exports =router; 