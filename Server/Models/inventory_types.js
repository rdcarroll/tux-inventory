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
    InventoryTypeName: {
      type: DataTypes.STRING(45),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "InventoryTypeName"
    }
  };
  const options = {
    tableName: "inventory_types",
    comment: "",
    indexes: []
  };
  const InventoryTypesModel = sequelize.define("inventory_types_model", attributes, options);
  return InventoryTypesModel;
};