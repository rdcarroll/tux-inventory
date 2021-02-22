const {
  DataTypes
} = require('sequelize');

module.exports = sequelize => {
  const attributes = {
    ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: true,
      comment: null,
      field: "ID"
    },
    EventID: {
      type: DataTypes.STRING(45),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "EventID"
    }
  };
  const options = {
    tableName: "orders",
    comment: "",
    indexes: []
  };
  const OrdersModel = sequelize.define("orders_model", attributes, options);
  return OrdersModel;
};