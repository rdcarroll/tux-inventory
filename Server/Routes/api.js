
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
  
  const status_types = require("../controllers/status_types.controller.js");
  router.get("/status_types", app.oauth.authorise(), status_types.findAll);
  router.get("/status_types/:id", app.oauth.authorise(), status_types.findOne);
  router.put("/status_types/:id", app.oauth.authorise(), status_types.update);
  router.post("/status_types", app.oauth.authorise(), status_types.create);
  
  const packages = require("../controllers/packages.controller.js");
  router.get("/packages", app.oauth.authorise(), packages.findAll);
  router.get("/packages/:id", app.oauth.authorise(), packages.findOne);
  router.put("/packages/:id", app.oauth.authorise(), packages.update);
  router.post("/packages", app.oauth.authorise(), packages.create);

  const package_inventory = require("../controllers/package_inventory.controller.js");
  router.get("/package_inventory", app.oauth.authorise(), package_inventory.findAll);
  router.get("/package_inventory/:id", app.oauth.authorise(), package_inventory.findOne);
  router.put("/package_inventory/:id", app.oauth.authorise(), package_inventory.update);
  router.post("/package_inventory", app.oauth.authorise(), package_inventory.create);

  const orders = require("../controllers/orders.controller.js");
  router.get("/orders", app.oauth.authorise(), orders.findAll);
  router.get("/orders/:id", app.oauth.authorise(), orders.findOne);
  router.put("/orders/:id", app.oauth.authorise(), orders.update);
  router.delete("/orders/:id", app.oauth.authorise(), orders.delete);
  router.post("/orders", app.oauth.authorise(), orders.create);
  
  const order_items = require("../controllers/order_items.controller.js");
  router.get("/orders/:id/order_items", app.oauth.authorise(), orders.findItems);
  router.put("/orders/:id/order_items", app.oauth.authorise(), orders.replaceItems);
  router.post("/order_items", app.oauth.authorise(), order_items.create);
  router.delete("/order_items/:id", app.oauth.authorise(), order_items.delete);

  return router;
};
