/**
 * restful api 子路由
 */

const router = require('koa-router')()
const checkAuth = require('../middleswares/checkAuth');
const posiController = require('../controllers/posi');

const routers = router
    .get('/posi/', checkAuth, posiController. )
    .post('/posi/', checkAuth, posiController. )

module.exports = routers
