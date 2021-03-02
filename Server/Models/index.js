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

db.customers = require("./customers.js")(sequelize);
db.employees = require("./employees.js")(sequelize);
db.event_types = require("./event_types.js")(sequelize);
db.inventory = require("./inventory.js")(sequelize);
db.inventory_items = require("./inventory_items.js")(sequelize);
db.inventory_types = require("./inventory_types.js")(sequelize);
db.status_types = require("./status_types.js")(sequelize);
//db.packages = require("./packages.js")(sequelize);
db.orders = require("./orders.js")(sequelize);

//db.inventory_types.hasMany(db.inventory);
db.inventory.belongsTo(db.inventory_types, {as:'InventoryType'});
db.inventory_items.belongsTo(db.status_types, {as:'Status'});

db.inventory.hasMany(db.inventory_items, { foreignKey:'InventoryID', as : 'InventoryItems' });
db.inventory_items.belongsTo(db.inventory, {as:'Inventory'});

module.exports = db;