var connection = require("../config/connection.js");

var orm = {
  selectAll: function(tableName, callback) {
    // select all from table name helper function
    var queryString = "SELECT * FROM " + tableName + ";";
    connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }

      callback(result);
    });
  },
  insertOne: function(tableName, columns, value, callback) {
    // insert into tableName with given column
    var queryString = "INSERT INTO " + tableName;
    queryString += " (";
    queryString += columns.toString();
    queryString += ") ";
    queryString += "VALUES (?) ";

    console.log(queryString);

    connection.query(queryString, value, function(err, result) {
      if (err) {
        throw err;
      }
      callback(result);
    });
  },
  updateOne: function(tableName, values, condition, callback) {
    // update values in entry with given condition in tableName
    var queryString = "UPDATE " + tableName;
    queryString += " SET ";
    queryString += objToSql(values);
    queryString += " WHERE ";
    queryString += condition;

    connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }
      callback(result);
    });
  }
}

// Helper function for SQL syntax.
function objToSql(ob) {
  var arr = [];

  for (var key in ob) {
    if (Object.hasOwnProperty.call(ob, key)) {
      arr.push(key + "=" + ob[key]);
    }
  }

  return arr.toString();
}

module.exports = orm;