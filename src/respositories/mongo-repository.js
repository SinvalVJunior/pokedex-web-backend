
const User = require('../models/user');

class MongoRepository {

   async saveUser(user) {
      return await User.create(user);
   }

   async updateUserInventory(userId, newInventory) {
      return await User.findByIdAndUpdate(userId, { inventory: newInventory }, { new: true } );
   }

   async findUserByEmail(email) {
      return await User.findOne({email});
   }

   async findUserById(id) {
      return await User.findById(id);
   }
}

module.exports = MongoRepository;