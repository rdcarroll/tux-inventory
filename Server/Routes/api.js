
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

  const inventory = require("../controllers/inventory.controller.js");
  router.get("/inventory", app.oauth.authorise(), inventory.findAll);
  router.get("/inventory/:id", app.oauth.authorise(), inventory.findOne);
  router.put("/inventory/:id", app.oauth.authorise(), inventory.update);
  router.post("/inventory", app.oauth.authorise(), inventory.create);

  const inventory_items = require("../controllers/inventory_items.controller.js");
  router.get("/inventory_items", app.oauth.authorise(), inventory_items.findAll);
  router.get("/inventory_items/:id", app.oauth.authorise(), inventory_items.findOne);
  router.put("/inventory_items/:id", app.oauth.authorise(), inventory_items.update);
  router.post("/inventory_items", app.oauth.authorise(), inventory_items.create);

  const inventory_types = require("../controllers/inventory_types.controller.js");
  router.get("/inventory_types", app.oauth.authorise(), inventory_types.findAll);
  router.get("/inventory_types/:id", app.oauth.authorise(), inventory_types.findOne);
  router.put("/inventory_types/:id", app.oauth.authorise(), inventory_types.update);
  router.post("/inventory_types", app.oauth.authorise(), inventory_types.create);
  
  // const packages = require("../controllers/packages.controller.js");
  // router.get("/packages", app.oauth.authorise(), packages.findAll);
  // router.get("/packages/:id", app.oauth.authorise(), packages.findOne);
  // router.put("/packages/:id", app.oauth.authorise(), packages.update);
  // router.post("/packages", app.oauth.authorise(), packages.create);

  return router;
};
