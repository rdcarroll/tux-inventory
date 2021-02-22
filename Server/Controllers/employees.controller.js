const emplyee_service = require("../Services/EmployeeService");
const token_service = require('../Services/tokenService');

// Create and Save a new Customer
exports.create = (req, res) => {
  
};

// Retrieve all Employees from the database.
exports.findAll = async (req, res) => {
  let response;
  try {
    response = await emplyee_service.getEmployees();
    res.json(response);
  } catch (err) {
    res.status(500).send({
      message: "Error retrieving employees"
    });
  }
};

// Find a single Employee with an id
exports.findOne = async (req, res) => {
  let response;
  const id = req.params.id;
  try {
    response = await emplyee_service.getEmployee(id);
    res.json(response);
  } catch (err) {
    res.status(500).send({
      message: "Error retrieving employee"
    });
  }
};

// Update a Customer by the id in the request
exports.update = (req, res) => {
  
};

// Delete a Customer with the specified id in the request
exports.delete = (req, res) => {
  
};

// Delete all Employees from the database.
exports.deleteAll = (req, res) => {
  
};

// Find all published Employees
exports.findAllPublished = (req, res) => {
  
// Retrieve all Employees from the database.
exports.findMe = async (req, res) => {
  let response;
  const access_token = req.header('authorization');
  try {
    token_service.getAccessToken(token, async (err,access_token) =>{
          try {
            response = await emplyee_service.getEmployee(access_token.id);
            res.json(response);
          } catch (err) {
            res.status(500).send({
              message: "Error retrieving employee"
            });
          }
    });
  } catch (err) {
    res.status(500).send({
      message: "Error retrieving access_token"
    });
  }
};
};