const jwt = require('jsonwebtoken');

class LoginService {

  constructor (secret) {
    this.secret = secret
  }

  async authenticate (username, password) {
    
    const accessToken = await jwt.sign(
      { id: username }, this.secret, { expiresIn: '1h' }
    )
    return accessToken
  }
}
module.exports=LoginService;