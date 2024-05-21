const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const Cart = sequelize.define('Cart', {
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id',
    },
    allowNull: false,
  },
}, {
  timestamps: true,
});

User.hasOne(Cart, { foreignKey: 'userId' });
Cart.belongsTo(User, { foreignKey: 'userId' });

module.exports = Cart;
