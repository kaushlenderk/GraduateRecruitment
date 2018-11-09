var express = require("express"); 
const mysql = require('mysql');   
var db = require('./config/database');
var dbfunc = require('./config/db-function'); 
var bodyParser = require('body-parser');
var session = require('client-sessions');
var user_model = require("./model/user_model");

var app = express(); 

/** site title **/
app.locals.siteTitle = "Memorial University";
app.locals.underConstruction = "Coming Soon";
app.locals.userName=null;

/** static resource file **/
app.use(express.static("./public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

 
/** session managment **/ 
app.use(session({
	  cookieName: 'session',
	  secret: 'random_string_goes_here',
	  duration: 30 * 60 * 1000,
	  activeDuration: 5 * 60 * 1000,
}));

app.use(function(req, res, next) {
	  var flag = true;
	  var memorialNumber="";
	  var password="";
	  
	  if(req.session.user !== undefined) {
		  memorialNumber = req.session.user[0].memorialNumber;
		  password = req.session.user[0].password;
	  }
	  else
	  {
		  flag =false;
		  next();
	  }
		  
	  if(flag)
	  { 
		  //console.log("flag " + flag + ":"+ memorialNumber +":"+password)
		  
		  var data ={
				  "memorialNumber": memorialNumber,
				  "password" : password
		  };
		  
		  user_model.verfiyCredentials(data, function(err, data) {	    
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
			 				res.locals.user = data;
			 				console.log("data: "+ data[0].password);
			 			} 
			 		} 			    	
			    } 
			    next();
		  });
		   
	  }
	  
});


/** app setting **/
app.set("port",process.env.PORT || 3335); 
app.set("view engine","ejs");
app.set("views","./views")

/** route setting **/
app.use(require("./routes/index_route"));
app.use(require("./routes/user_route")); 
app.use(require("./routes/faculty_route")); 
app.use(require("./routes/student_route")); 
app.use(require("./routes/api"));   

/** start listener **/
app.listen(app.get("port"),function(){
    console.log("Listening on port " + app.get("port"));
});
