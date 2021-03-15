const dbConfig = require("../DataAccess/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: 0,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.access_token = require("./access_token.js")(sequelize);
db.customers = require("./customers.js")(sequelize);
db.employees = require("./employees.js")(sequelize);
db.event_types = require("./event_types.js")(sequelize);
db.inventory = require("./inventory.js")(sequelize);
db.inventory_items = require("./inventory_items.js")(sequelize);
db.inventory_types = require("./inventory_types.js")(sequelize);
db.status_types = require("./status_types.js")(sequelize);
db.packages = require("./packages.js")(sequelize);
db.package_inventory = require("./package_inventory.js")(sequelize);
db.orders = require("./orders.js")(sequelize);
db.order_items = require("./order_items.js")(sequelize);
db.order_tickets = require("./order_tickets.js")(sequelize);


db.inventory_types.hasMany(db.inventory,  { foreignKey:'InventoryTypeID', as : 'Inventory'  });
db.inventory.belongsTo(db.inventory_types, { foreignKey:'InventoryTypeID', as : 'InventoryType'  });

db.status_types.hasMany(db.inventory_items,  { foreignKey:'StatusID', as : 'InventoryItems'  });
db.inventory_items.belongsTo(db.status_types, { foreignKey:'StatusID', as : 'Status'  });

db.inventory.hasMany(db.inventory_items, { foreignKey:'InventoryID', as : 'InventoryItems' });
db.inventory_items.belongsTo(db.inventory, { foreignKey:'InventoryID', as : 'Inventory' });

db.customers.hasMany(db.orders, {  foreignKey:'CustomerID', as : 'Orders' });
db.orders.belongsTo(db.customers, { foreignKey:'CustomerID', as : 'Customer' });

db.inventory_items.hasMany(db.order_items, {  foreignKey:'InventoryItemID', as : 'OrderItems' });
db.order_items.belongsTo(db.inventory_items, { foreignKey:'InventoryItemID', as : 'InventoryItem' });

db.orders.hasMany(db.order_items, {  foreignKey:'OrderID', as : 'OrderItems' });
db.order_items.belongsTo(db.orders, { foreignKey:'OrderID', as : 'Order' });

db.orders.hasMany(db.order_tickets, {  foreignKey:'OrderID', as : 'OrderTickets' });
db.order_tickets.belongsTo(db.orders, { foreignKey:'OrderID', as : 'Order' });

db.customers.hasMany(db.order_tickets, {  foreignKey:'CustomerID', as : 'OrderTickets' });
db.order_tickets.belongsTo(db.customers, { foreignKey:'CustomerID', as : 'Customer' });

db.packages.hasMany(db.package_inventory,  { foreignKey:'PackageID', as : 'PackageInventory'  });
db.package_inventory.belongsTo(db.packages, { foreignKey:'PackageID', as : 'Package'  });

db.inventory.hasMany(db.package_inventory,  { foreignKey:'InventoryID', as : 'PackageInventory'  });
db.package_inventory.belongsTo(db.inventory, { foreignKey:'InventoryID', as : 'Inventory'  });

module.exports = db;