const mysql = require("mysql");
const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);
require("dotenv").config();

const options = {
	connectionLimit: 10,
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASS,
	database: process.env.DB_NAME
};

const pool = mysql.createPool(options);

const sessionStore = new MySQLStore({ expiration: 20 * 2000 }, pool);

function executeQuery(query, callback) {
	pool.getConnection(function (err, connection) {
		if (err) { // not connected!
			throw err;
			// callback(true);
		}
		// Use the connection
		connection.query(query, function (err, results) {
			// When done with the connection, release it.
			// console.log('Im executing query');
			connection.release();
			// Handle error after the release.
			if (err) {
				// callback(true);
				throw err;
			}
			// Don't use the connection here, it has been returned to the pool.
			callback(null, { rows: results });
		});
		// connection.on("error", function (err) {
		// 	// callback(true);
		// 	// console.log(err);
		// 	// return;
		// 	if(err) {
		// 		throw err;
		// 	}
		// });
	});
}

pool.on("connection", function (connection) {
	// connection.query('SET SESSION auto_increment_increment=1')
	// console.log(connection.threadId);
	// console.log('Se creó una conexión en el pool');
});

pool.on("release", function (connection) {
	// console.log("Se liberó una conexión con el id " + connection.threadId);
});

pool.on("enqueue", function () {
	// console.log('Waiting for available connection slot');
});

pool.on("acquire", function (connection) {
	// console.log('Se dio una conexión con el id %d', connection.threadId);
});

pool.on("warning", (e) => {
	// console.warn(e.stack);
	// console.log(e);
});

module.exports.executeQuery = executeQuery;
module.exports.sessionStore = sessionStore;
