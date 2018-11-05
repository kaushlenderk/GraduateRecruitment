var express = require("express");
var app = express(); 
 

/** site title **/
app.locals.siteTitle = "Memorial University";
app.locals.underConstruction = "Coming Soon";

/** static resource file **/
app.use(express.static("./public"));

/** app setting **/
app.set("port",process.env.PORT || 3335); 
app.set("view engine","ejs");
app.set("views","./views")

/** route setting **/
app.use(require("./routes/index"));
app.use(require("./routes/faculty")); 
app.use(require("./routes/student"));   

/** start listener **/
app.listen(app.get("port"),function(){
    console.log("Listening on port " + app.get("port"));
});
