const model_service = require(`../Services/InventoryItemService`);
const model_name = `InventoryItem`;

// Create and Save a new Customer
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

// Retrieve all Employees from the database.
exports.findAll = async (req, res) => {
  let response;
  try {
    response = await model_service.getAll();
    res.json(response);
  } catch (err) {
    res.status(500).send({
      message: `Error retrieving ${model_name}s : ${err.message}`
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
      message: `Error retrieving ${model_name} : ${err.message}`
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
      message: `Error updating ${model_name} : ${err.message}.`
    });
  }
};


