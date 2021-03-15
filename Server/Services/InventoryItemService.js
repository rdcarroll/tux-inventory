const db = require("../Models");
const Model = db.inventory_items;
const { Op } = require("sequelize");

module.exports = {
    getAll: getAll,
    getOne: getOne,
    create: create,
    update: update,
    checkBooking:checkBooking
};
// async function getAll() {
//     try {
//       return await Model.findAll({ include: ['Inventory','Status'] });
//     } catch (err) {
//       throw err;
//     }
// }
// async function getOne(id) {
//     try {
//       return await Model.findByPk(id,{ include: ['Inventory','Status'] });
//     } catch (err) {
//       throw err;
//     }
// }
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
    return await Model.create(record);
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


async function checkBooking(orderid, items){
  try {
    for (const item of items) {
      let order = await db.orders.findByPk(orderid);
      const startDate = new Date(order.pickUpDate);
      const endDate = new Date(order.returnDate);
        let bookings = await db.order_items.findAll(
          {
            include:[{association:'Order'},{association:'InventoryItem'}],
            where:{
            [Op.and]: [
              { InventoryItemID:item.ID },
              { '$InventoryItem.Barcode$': { [Op.ne]:null } },
              { '$Order.pickUpDate$': { [Op.lte]:endDate } },
              {'$Order.returnDate$': { [Op.gte]: startDate } }
            ]
          }} );
        item.overbooked=bookings.length>1;
    }
    return items;
  } catch (error) {
    throw error;
  }
}