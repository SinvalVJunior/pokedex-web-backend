const express = require('express');
const router = express.Router();
const UserService = require('../services/user-service');
// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
});
// define the home page route
router.get('/', async (req, res) => {
    const service = new UserService();
    const userInfo = await service.getUserInfo();
    return res.status(200).send({ userInfo: userInfo });
});


module.exports = router;