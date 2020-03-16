const mysql = require('mysql');


let config = {
    user: process.env.SQL_USER,
    password: process.env.SQL_PASSWORD,
    database: process.env.SQL_DATABASE,
    acquireTimeout: 1000000
}

if (
    process.env.INSTANCE_CONNECTION_NAME &&
    process.env.NODE_ENV === 'production'
  ) {
    config.socketPath = `/cloudsql/${process.env.INSTANCE_CONNECTION_NAME}`;
  }


let connection = mysql.createConnection(config)


connection.connect(function(err) {
    if(err) {
        console.error("Error connecting to db " + err.stack)
        return
    }
    console.log("Connected as thread id " + connection.threadId)
})


module.exports = connection