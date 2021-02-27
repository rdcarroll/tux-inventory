
module.exports = (router, app) => {
  const employees = require("../controllers/employees.controller.js");
  router.get("/employees", app.oauth.authorise(), employees.findAll);
  router.get("/employees/Me", app.oauth.authorise(), employees.findMe);
  router.get("/employees/:id", app.oauth.authorise(), employees.findOne);
  router.put("/employees/:id", app.oauth.authorise(), employees.update);
  router.post("/employees", app.oauth.authorise(), employees.create);

  const customers = require("../controllers/customers.controller.js");
  router.get("/customers", app.oauth.authorise(), customers.findAll);
  router.get("/customers/:id", app.oauth.authorise(), customers.findOne);
  router.put("/customers/:id", app.oauth.authorise(), customers.update);
  router.post("/customers", app.oauth.authorise(), customers.create);

  const event_types = require("../controllers/event_types.controller.js");
  router.get("/event_types", app.oauth.authorise(), event_types.findAll);
  router.get("/event_types/:id", app.oauth.authorise(), event_types.findOne);
  router.put("/event_types/:id", app.oauth.authorise(), event_types.update);
  router.post("/event_types", app.oauth.authorise(), event_types.create);

  
  return router;
};
