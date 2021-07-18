
const User = require('../models/user');

class MongoRepository {

   async saveUser(user) {
      return await User.create(user);
   }

   async findUserByEmail(email) {
      return await User.findOne({email});
   }
}

module.exports = MongoRepository;