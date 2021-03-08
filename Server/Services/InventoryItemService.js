const db = require("../Models");
const Model = db.inventory_items;

module.exports = {
    getAll: getAll,
    getOne: getOne,
    create: create,
    update: update
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