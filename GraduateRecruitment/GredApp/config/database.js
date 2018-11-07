var mysql = require('mysql');


var connection = mysql.createPool({
    connectionLimit : 100,
    host     : 'localhost',
    user     : 'root',
    password : 'Admin@1234',
    database : 'gredapp'
})

 
/* connection.connect(function(err) {
    if (err) 
    {
    	throw err;
    }
    
    console.log("MySQL Connected...")
}); */

module.exports = connection;