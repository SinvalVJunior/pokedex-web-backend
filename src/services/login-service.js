const jwt = require('jsonwebtoken');
const jwtSecret = require('../config');
const dbRepository = require('../respositories/json-repository');
const MongoRepository = require('../respositories/mongo-repository');

class LoginService {

  constructor () {
    this.secret = jwtSecret;
    this.dbRepository = new dbRepository();
    this.mongoRepository = new MongoRepository();
  }

  async authenticate (email, password) {
    
    const user = await this.mongoRepository.findUserByEmail(email);
    if(!user)
      throw new Error(`User with email ${email} not found.`);
    
    if(password === user.password){
      const token = await jwt.sign({ id: email }, this.secret, { expiresIn: '1h' });

      return  { token, user: { email: user.email, name: user.name, id: user.id } };
    } else {
      throw new Error('Invalid password');
    }
  }
}
module.exports=LoginService;