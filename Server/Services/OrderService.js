const db = require("../Models");
const Model = db.orders;

module.exports = {
    getAll: getAll,
    getOne: getOne,
    create: create,
    update: update,
    remove: remove

};
async function getAll(query) {
    try {
      return await Model.findAll(query);
    } catch (err) {
      throw err;
    }
}
async function getOne(query) {
    try {
      let id = query.where.ID;
      return await Model.findByPk(id,query);
    } catch (err) {
      throw err;
    }
}

async function create(record) {
  try {
    const model = await Model.create(record);
    const dInv = await db.inventory.findAll({where:{ModelName:"default"}});
    for (const di of dInv) {
      const dInvItems = await db.inventory_items.findAll({limit:1, where:{InventoryID:di.ID}});
      for (const dii of dInvItems) {
        await db.order_items.create({
          OrderID:model.ID,
          CustomerID:model.CustomerID,
          StatusID:2,
          EmployeeID:1,
          InventoryItemID:dii.ID
        });
      }
     }
    return model;
  } catch (err) {
    throw err;
  }
}
async function update(id,record) {
  try {
    return await Model.update(record, {
      where: {
        ID: id
      }
    });
  } catch (err) {
    throw err;
  }
}
async function remove(id) {
  try {
    const orderItemsModel = db.order_items;
    const model = await Model.findByPk(id);
    //remove child elements
    const oiModels = await orderItemsModel.destroy({where:{OrderID:model.ID}});
    return await model.destroy();
  } catch (err) {
    throw err;
  }
}
async function getOrderItems(id) {
    try {
      return await Model.findAll();
    } catch (err) {
      throw err;
    }
}