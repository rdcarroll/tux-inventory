const db = require("../models");
const Model = db.employees;

module.exports = {
    getAll: getAll,
    getOne: getOne,
    create: create,
    update: update
};
async function getAll() {
    try {
      return await Model.findAll();
    } catch (err) {
      throw err;
    }
}
async function getOne(id) {
    try {
      return await Model.findByPk(id);
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