'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }

    toJSON(){
      return { ...this.get(), id: this.get("uuid") }
    }
  }
  Product.init({
    uuid: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(300),
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false
    },
    currency: {
      type: DataTypes.STRING(5),
      allowNull: false
    },
    imageURL: {
      type: DataTypes.STRING(1000),
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};