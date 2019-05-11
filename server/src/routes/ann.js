/**
 * restful api 子路由
 */

const router = require('koa-router')()
const checkAuth = require('../middleswares/checkAuth');
const annController = require('../controllers/ann');

const routers = router
    .get('/ann/list', checkAuth, annController.getAnnList )
    .post('/ann/create', checkAuth, annController.createAnn )
    .post('/ann/delete', checkAuth, annController.deleteAnn )

module.exports = routers

