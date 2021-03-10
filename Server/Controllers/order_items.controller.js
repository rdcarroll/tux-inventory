const model_service = require(`../Services/OrderItemService`);
const model_name = `OrderItem`;

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
    response = await model_service.getAll(req.query);
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
  if(req.query.where)req.query.where['ID']=id;
  try {
    response = await model_service.getOne(req.query);
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
exports.delete = async (req, res) => {
  let response;
  const id = req.params.id;
  try {
    response = await model_service.remove(id);
    res.json(response);
  } catch (err) {
    res.status(500).send({
      message: `Error deleting ${model_name}`
    });
  }
};
