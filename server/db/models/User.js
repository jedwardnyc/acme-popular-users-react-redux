const Sequelize = require('sequelize');
const conn = require('../conn');

const User = conn.define('user', {
  name: {
    type: Sequelize.STRING
  },
  rank: {
    type: Sequelize.INTEGER
  }
});

module.exports = User;