const pool = require('../config/db.js');
const mysql = require('mysql');

// GET
function getUser(username, callback) {
    let sql = "SELECT * FROM users WHERE user_id = ?;";
    const inserts = [username];
    const query = mysql.format(sql, inserts);
    pool.executeQuery(query, function(err, results) {
        if (err) {
            throw err;
        }
        callback(null, results);
    })
}

function getLogin(username, password, callback) {
    let sql = "SELECT * FROM users WHERE user_mail = ? AND user_password = ?;";
    const inserts = [username, password];
    const query = mysql.format(sql, inserts);
    pool.executeQuery(query, function(err, results) {
        if (err) {
            throw err;
        }
        callback(null, results);
    })
}

function getThreadsBy10(page, callback) {
    let sql = "SELECT *, (SELECT COUNT(thread_id) FROM threads) as count_thread FROM threads ORDER BY thread_id DESC LIMIT ?, 10";
    const inserts = [page];
    const query = mysql.format(sql, inserts);
    pool.executeQuery(query, function(err, results) {
        if (err) {
            throw err;
        }
        callback(null, results);
    })
}

function getComments(threadID, callback) {
    let sql = "SELECT * FROM comments WHERE thread_id = ?;";
    const inserts = [threadID];
    const query = mysql.format(sql, inserts);
    // console.log(sql)
    pool.executeQuery(query, function(err, results) {
        if (err) {
            throw err;
        }
        callback(null, results);
    })
}



// POST
function postUser(username, email, password, callback) {
    let sql = "INSERT INTO users(username, user_mail, user_password) VALUES(?,?,?);";
    const inserts = [username, email, password];
    const query = mysql.format(sql, inserts);
    pool.executeQuery(query, function(err, results) {
        if (err) {
            throw err;
        }
        callback(null, results);
    })
}

// POST
// function postThread(thread_title, thread_text, user_id, callback) {
//     let image = image;
//     let sql = "INSERT INTO users(username, user_mail, user_password) VALUES(?,?,?);";
//     const inserts = [username, email, password];
//     const query = mysql.format(sql, inserts);
//     pool.executeQuery(query, function(err, results) {
//         if (err) {
//             throw err;
//         }
//         callback(null, results);
//     })
// }

// UPDATE
function editThread(user_id, thread_id, thread_title, thread_text, callback) {
    let sql = "UPDATE threads SET thread_title = ?, thread_text = ? WHERE user_id = ? AND thread_id = ?;";
    const inserts = [thread_title, thread_text, user_id, thread_id];
    const query = mysql.format(sql, inserts);
    pool.executeQuery(query, function(err, results) {
        if (err) {
            throw err;
        }
        callback(null, results);
    })
}

function editComment(user_id, comment_id, comment_text, callback) {
    let sql = "UPDATE comments SET comment_text = ? WHERE user_id = ? AND comment_id = ?;";
    const inserts = [comment_text, user_id, comment_id];
    const query = mysql.format(sql, inserts);
    pool.executeQuery(query, function(err, results) {
        if (err) {
            throw err;
        }
        callback(null, results);
    })
}

// DELETE
function deleteUser(user_id, callback) {
    let sql = "DELETE FROM users WHERE user_id = ?;";
    const inserts = [user_id];
    const query = mysql.format(sql, inserts);
    pool.executeQuery(query, function(err, results) {
        if (err) {
            throw err;
        }
        callback(null, results);
    })
}

function deleteThread(thread_id, callback) {
    let sql = "DELETE FROM threads WHERE thread_id = ?";
    const inserts = [thread_id];
    const query = mysql.format(sql, inserts);
    pool.executeQuery(query, function(err, results) {
        if (err) {
            throw err;
        }
        callback(null, results);
    })
}

function deleteComment(user_id, comment_id, comment_text, callback) {
    let sql = "DELETE FROM comment WHERE comment_id = ?;";
    const inserts = [comment_id];
    const query = mysql.format(sql, inserts);
    pool.executeQuery(query, function(err, results) {
        if (err) {
            throw err;
        }
        callback(null, results);
    })
}

module.exports.getUser = getUser;
module.exports.postUser = postUser;
module.exports.editThread = editThread;
module.exports.editComment = editComment;
module.exports.getThreadsBy10 = getThreadsBy10;
module.exports.getComments = getComments;
module.exports.getLogin = getLogin;
