const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Cart = require('./Cart');
const Product = require('./Product');

const CartProduct = sequelize.define('CartProduct', {
  cartId: {
    type: DataTypes.INTEGER,
    references: {
      model: Cart,
      key: 'id',
    },
    allowNull: false,
  },
  productId: {
    type: DataTypes.INTEGER,
    references: {
      model: Product,
      key: 'id',
    },
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    min: 1,
  },
}, {
  timestamps: true,
});

Cart.belongsToMany(Product, { through: CartProduct, foreignKey: 'cartId' });
Product.belongsToMany(Cart, { through: CartProduct, foreignKey: 'productId' });

module.exports = CartProduct;
