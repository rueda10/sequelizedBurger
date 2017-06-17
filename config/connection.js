var mysql = require("mysql");
var connection;

// creating db connection
if (process.env.JAWSDB_URL) {
  // if JAWSDB env variable exists, create connection to JAWSDB
  connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
  // create local db connection otherwise
  connection = mysql.createConnection({
    port: 3306,
    host: "localhost",
    user: "root",
    password: "",
    database: "burgers_db"
  });
}

connection.connect(function(err) {
  // connect to db
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }

  console.log("connected as id " + connection.threadId);
 });

module.exports = connection;