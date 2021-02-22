const db = require("../models");
const Employees = db.employees;

module.exports = {
    getEmployees: getEmployees,
    getEmployee: getEmployee,
    //getLoggedInUser: getLoggedInUser
};
async function getEmployees() {
    try {
      return await Employees.findAll();
    } catch (err) {
      throw err;
    }
}
async function getEmployee(id) {
    try {
      return await Employees.findOne(id);
    } catch (err) {
      throw err;
    }
}

// function getLoggedInUser(token,cbFunc) {
//     try {
//         token_service.getAccessToken(token, (err,access_token) =>{
//             try {
//         let emp = getEmployee(access_token.id);
//                 cbFunc( emp);
//               } catch (err) {
//                 throw err;
//               }
//         });
//       } catch (err) {
//         throw err;
//       }
// }