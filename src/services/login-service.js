const jwt = require('jsonwebtoken');
const jwtSecret = require('../config');
const dbRepository = require('../respositories/json-repository');
const MongoRepository = require('../respositories/mongo-repository');
const bcrypt = require('bcrypt');
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
    
    if(bcrypt.compare(password, user.password)){

      return await this.#signUser(user);  
    } else {
      throw new Error('Invalid password');
    }
  }

  async authenticateFacebook(email, name, picture) {

    let user = await this.mongoRepository.findUserByEmail(email);
    if(!user) {
      user = { email, name, picture };
      user = await this.mongoRepository.saveUser(user);
    }

    return await this.#signUser(user);   
  }

  async #signUser(user) {
    const token = await jwt.sign({ id: user.email }, this.secret, { expiresIn: '1h' });

    return  { token, user: { email: user.email, name: user.name, id: user.id } };
  }
}
module.exports=LoginService;