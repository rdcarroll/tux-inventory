const model_service = require(`../Services/OrderService`);
const orderitem_service = require(`../Services/OrderItemService`);

const model_name = `Order`;

// Create and Save a new Customer
exports.create = async (req, res) => {
  let response;
  let nModel = req.body;
  try {
    response = await model_service.create(nModel);
    res.json(response);
  } catch (err) {
    res.status(500).send({
      message: `Error creating ${model_name}`
    });
  }
};

// Retrieve all Employees from the database.
exports.findAll = async (req, res) => {
  let response;
  try {
    response = await model_service.getAll();
    res.json(response);
  } catch (err) {
    res.status(500).send({
      message: `Error retrieving ${model_name}s`
    });
  }
};

// Find a single Employee with an id
exports.findOne = async (req, res) => {
  let response;
  const id = req.params.id;
  try {
    response = await model_service.getOne(id);
    res.json(response);
  } catch (err) {
    res.status(500).send({
      message: `Error retrieving ${model_name}`
    });
  }
};

// Update a Customer by the id in the request
exports.update = async (req, res) => {
  let response;
  const id = req.params.id;
  let uModel = req.body;
  try {
    response = await model_service.update(id, uModel);
    res.json(response);
  } catch (err) {
    res.status(500).send({
      message: `Error updating ${model_name}.`
    });
  }
};

// Delete a Customer with the specified id in the request
exports.delete = (req, res) => {
  
};

exports.findItems = async (req, res) => {
  let response;
  const id = req.params.id;
  try {
    response = await orderitem_service.getAll(id);
    res.json(response);
  } catch (err) {
    res.status(500).send({
      message: `Error retrieving ${model_name}`
    });
  }
};

