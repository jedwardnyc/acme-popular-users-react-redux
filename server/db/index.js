const conn = require('./conn');
const User  = require('./models/User');

const syncAndSeed = () => {
  conn.sync({ force: true })
  .then(()=>{
    Promise.all([
      User.create({name: 'Cole', rank: 1 }),
      User.create({name: 'Jacob', rank: 3 }),
      User.create({name: 'Steve', rank: 2 }),
    ])
  })
};

module.exports = {
  syncAndSeed,
  models: {
    User
  }
};