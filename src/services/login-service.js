const jwt = require('jsonwebtoken');
const dbRepository = require('../respositories/json-repository');

class LoginService {

  constructor (secret) {
    this.secret = secret
    this.dbRepository = new dbRepository();
  }

  async authenticate (username, password) {
    
    const token = await jwt.sign(
      { id: username }, this.secret, { expiresIn: '1h' }
    );

    const user = await this.dbRepository.getData('userInfo');
    return  { token, user };
  }
}
module.exports=LoginService;