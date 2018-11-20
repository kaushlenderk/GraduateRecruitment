var mysql = require('mysql');

/* --- local database --- */

var connection = mysql.createPool({
    connectionLimit : 100,
    host     : 'localhost',
    user     : 'root',
    password : 'Admin@1234',
    database : 'gredapp'
}) 

 
/* --- remote database --- */

/*var connection = mysql.createPool({
    connectionLimit : 100,
    host     : '85.10.205.173', //https://db4free.net/
    port     :  3306,
    user     : 'gredrec',
    password : 'test@1234',
    database : 'gredrec'
}) */

/* connection.connect(function(err) {
    if (err) 
    {
    	throw err;
    }
    
    console.log("MySQL Connected...")
}); */

module.exports = connection;