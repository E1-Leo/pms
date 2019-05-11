/**
 * restful api 子路由
 */

const router = require('koa-router')()
const checkAuth = require('../middleswares/checkAuth');
const staffController = require('../controllers/staff');

const routers = router
    .get('/staff/list', checkAuth, staffController.getStaffList )
    .post('/staff/create', checkAuth, staffController.createStaff )
    .post('/staff/delete', checkAuth, staffController.deleteStaff )

module.exports = routers
