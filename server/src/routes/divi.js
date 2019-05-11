/**
 * restful api 子路由
 */

const router = require('koa-router')()
const checkAuth = require('../middleswares/checkAuth');
const diviController = require('../controllers/divi');

const routers = router
    .get('/divi/list', checkAuth, diviController.getDiviList )
    .post('/divi/create', checkAuth, diviController.createDivi )
    .post('/divi/delete', checkAuth, diviController.deleteDivi )

module.exports = routers
