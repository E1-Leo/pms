/**
 * restful api 子路由
 */

const router = require('koa-router')()
const checkAuth = require('../middleswares/checkAuth');
const staffController = require('../controllers/staff');

const routers = router
    .get('/staff/', checkAuth, staffController. )
    .post('/staff/', checkAuth, staffController. )

module.exports = routers
