/**
 * restful api 子路由
 */

const router = require('koa-router')()
const checkAuth = require('../middleswares/checkAuth');
const userController = require('../controllers/user');

const routers = router
  .post('/user/signIn', userController.signIn)
  .post('/user/signOut', userController.signOut)
  
  .get('/user/list', checkAuth, userController.getUserList)
  .post('/user/update', checkAuth, userController.updateUser)
  .post('/user/create', checkAuth, userController.createUser)
  .post('/user/delete', checkAuth, userController.deleteUser)
  
module.exports = routers