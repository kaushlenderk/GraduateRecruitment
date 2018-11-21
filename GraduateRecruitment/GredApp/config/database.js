var mysql = require('mysql');

/* --- local database --- */

var connection = mysql.createPool({
    connectionLimit : 1000,
    connectTimeout  : 60 * 60 * 10000,
    aquireTimeout   : 60 * 60 * 10000,
    timeout         : 60 * 60 * 10000,
    host     : 'localhost',
    user     : 'root',
    password : 'Admin@1234',
    database : 'gredapp'
}) 

 
/* --- remote database --- */

/*
var connection = mysql.createPool({
    connectionLimit : 1000,
    connectTimeout  : 60 * 60 * 100000,
    aquireTimeout   : 60 * 60 * 100000,
    timeout         : 60 * 60 * 100000,
    host    		: '85.10.205.173', //https://db4free.net/
    port     		:  3306,
    user     		: 'gredapp',
    password 		: 'Admin@1234',
    database 		: 'gredapp'
})
*/

/* connection.connect(function(err) {
    if (err) 
    {
    	throw err;
    }
    
    console.log("MySQL Connected...")
}); */

module.exports = connection;