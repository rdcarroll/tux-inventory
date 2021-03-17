
const db = require("../Models");
const Model = db.order_tickets;

module.exports = {
    getAll: getAll,
    getOne: getOne,
    create: create,
    update: update,
    syncOrder: syncOrder
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
async function syncOrderByTicket(id) {
  try {
    let orderTicket = await db.order_tickets.findAll({where: {ID: id}});
    return await syncOrder(orderTicket.OrderID);
  } catch (err) {
    throw err;
  }
}
async function syncOrder(id) {
  try {
    let order = await db.orders.findByPk(id);
    let company = await db.company.findAll();
    let orderTickets = await db.order_tickets.findAll({where: {OrderID: order.ID }});
    let orderItems = await db.order_items.findAll({where: {OrderID: order.ID }});
    let ot;
    if(orderTickets.length==0){
      //create new ticket
      ot = await db.order_tickets.create({
       OrderID:order.ID,
       SubTotal:0,
       Total:0,
       Tax:0,
       Adjustment:0,
       CustomerID:order.CustomerID,
     });
    }
    else{
      ot = orderTickets[0];
    }
    let subtotal=0;
    for (const item of orderItems) {
      subtotal += (item.Cost||0);
    }

    //update ticket
    let update = {Adjustment:0, Tax:0, SubTotal:0,Total:0};
    update.Adjustment = ot.Adjustment||0;
    update.SubTotal = subtotal;
    if(company.length>0) update.Tax = subtotal * (company[0].TaxRate||.10);
    update.Total = update.SubTotal + update.Tax + update.Adjustment;
    
    return await Model.update(update, {
      where: {
        ID: ot.ID
      }
    });

  } catch (err) {
    throw err;
  }
}