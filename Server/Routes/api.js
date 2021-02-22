
module.exports = (router, app) => {
  const employees = require("../controllers/employees.controller.js");
  router.get("/employees", app.oauth.authorise(), employees.findAll);
  router.get("/employees/Me", app.oauth.authorise(), employees.findOne);
  router.get("/employees/:id", app.oauth.authorise(), employees.findOne);

  const customers = require("../controllers/customers.controller.js");
  router.get("/customers",  customers.findAll);
  router.get("/customers/:id",  customers.findOne);

  return router;
};
