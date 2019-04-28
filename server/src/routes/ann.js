/**
 * restful api 子路由
 */

const router = require('koa-router')()
const checkAuth = require('../middleswares/checkAuth');
const annController = require('../controllers/ann');

const routers = router
    .get('/ann/', checkAuth, annController. )
    .post('/ann/', checkAuth, annController. )

module.exports = routers

