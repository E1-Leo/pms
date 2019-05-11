/**
 * restful api 子路由
 */

const router = require('koa-router')()
const checkAuth = require('../middleswares/checkAuth');
const posiController = require('../controllers/posi');

const routers = router
    .get('/posi/list', checkAuth, posiController.getPosiList )
    .post('/posi/create', checkAuth, posiController.createPosi )
    .post('/posi/delete', checkAuth, posiController.deletePosi )

module.exports = routers
