const Sequelize = require('sequelize');
const conn = require('../conn');

const User = conn.define('user', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: {
      args: true,
      msg: 'Name must be unique. Please try again.',
    },
  },
  rank: {
    type: Sequelize.INTEGER,
    allowNull: {
      args: false,
      msg: 'Please enter a Rank.'
    },
    defaultValue: 0
  }
});

module.exports = User;