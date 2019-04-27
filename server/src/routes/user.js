/**
 * restful api 子路由
 */

const router = require('koa-router')()
const userController = require('../controllers/user');

const routers = router
  .post('/user/signIn', userController.signIn)
  .get('/user/signOut', userController.signOut)
  
module.exports = routers