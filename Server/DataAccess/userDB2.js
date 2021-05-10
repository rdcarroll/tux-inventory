const db = require("../Models");
const Model = db.employees;

module.exports = (injectedPgPool) => {
    pgPool = injectedPgPool;

    return {
        register: register,
        getUser: getUser,
        isValidUser: isValidUser,
        getUserByID: getUserByID
    };
};

var crypto = require("crypto");

function register(username, password, cbFunc) {

    var shaPass = crypto.createHash("sha256").update(password).digest("hex");

    const query = `INSERT INTO employees (username, password) VALUES ('${username}', '${shaPass}') ON DUPLICATE KEY UPDATE password = "${shaPass}"`;

    pgPool.query(query, cbFunc);
}

function getUser(username, password, cbFunc) {
    var shaPass = crypto.createHash("sha256").update(password).digest("hex");

    Model.findAll({where:{username:username, password:shaPass}})
   .then(function(response) {
       cbFunc(false,response[0]);
     }).catch(function (err) {
        // handle error;
        cbFunc(err, false);
      });
}
function getUserByID(id, cbFunc) {
    Model.findAll({where:{ID:id}})
   .then(function(response) {
       cbFunc(false,response[0]);
     }).catch(function (err) {
        // handle error;
        cbFunc(err, false);
      });
}

function isValidUser(username, cbFunc) {
    Model.findAll({where:{username:username}})
   .then(function(response) {
       cbFunc(false,response!=null&&response.length>0);
     }).catch(function (err) {
        // handle error;
        cbFunc(err, false);
      });
}
