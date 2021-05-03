const model_service = require(`../Services/InventoryItemService`);
const orderitem_service = require(`../Services/OrderItemService`);
const model_name = `InventoryItem`;

// Create and Save a new Record
exports.create = async (req, res) => {
  let response;
  let nModel = req.body;
  try {
    response = await model_service.create(nModel);
    res.json(response);
  } catch (err) {
    res.status(500).send({
      message: `Error creating ${model_name} : ${err.message}`
    });
  }
};

// Retrieve all Records from the database
exports.findAll = async (req, res) => {
  let response;
  try {
    if(req.query['OrderID']){
      req.query['raw']=true;
      req.query['nest']=true;
    }
    response = await model_service.getAll(req.query);
    let verified = req.query['OrderID'] ? await model_service.checkBooking(req.query['OrderID'], response.rows) : response.rows;
    response.rows = verified;
    res.json(response);
  } catch (err) {
    res.status(500).send({
      message: `Error retrieving ${model_name}s : ${err.message}`
    });
  }
};

// Find a single Record with an ID
exports.findOne = async (req, res) => {
  let response;
  const id = req.params.id;
  if(req.query.where)req.query.where['ID']=id;
  try {
    response = await model_service.getOne(req.query);
    res.json(response);
  } catch (err) {
    res.status(500).send({
      message: `Error retrieving ${model_name} : ${err.message}`
    });
  }
};

// Update a Record by the ID in the request
exports.update = async (req, res) => {
  let response;
  const id = req.params.id;
  let uModel = req.body;
  try {
    response = await model_service.update(id, uModel);
    res.json(response);
  } catch (err) {
    res.status(500).send({
      message: `Error updating ${model_name} : ${err.message}.`
    });
  }
};

exports.findSizes = async (req, res) => {
  let response;
  const id = req.params.id; //inventory id
  const OrderItemID = req.query.OrderItemID; //order id
  if(req.query.where)req.query.where['InventoryID']=id;
  try {
    let uResponse = [];
    //get unique sizes for inventory model
    response = await model_service.getAllSizes(req.query);
    for (const item of response) {
      uResponse.push({ItemSize:item.Size,overbooked:false, ID:OrderItemID});
    }
    let verified = await orderitem_service.checkBooking(uResponse);
    res.json(verified);
  } catch (err) {
    res.status(500).send({
      message: `Error retrieving ${model_name}:${err.message}`
    });
  }
};

exports.addAction = async (req, res) => {
  let response;
  const id = req.params.id;
  let uModel = req.body;
  try {
    actionres = await model_service.actionitem(id, uModel.status_type);
    if(req.query.where)req.query.where['ID']=id;
    response = await model_service.getOne(req.query);
    res.json(response);
  } catch (err) {
    res.status(500).send({
      message: `Error updating ${model_name} : ${err.message}.`
    });
  }
};


