
module.exports = (router, app) => {
  //const employeeService = require("../server/Services/EmployeeService.js");
  const employeeService = require("../../server/Services/EmployeeService");
  router.get("/employees", app.oauth.authorise(), employeeService.getEmployees);
  router.get("/employees/Me", app.oauth.authorise(), employeeService.getEmployee);
  router.get("/employees/:id", app.oauth.authorise(), employeeService.getEmployee);

  return router;
};
