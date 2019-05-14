/**
 * restful api 子路由
 */

const router = require('koa-router')()
// const checkAuth = require('../middleswares/checkAuth');
const staffController = require('../controllers/staff');

const routers = router
    .get('/staff/list', staffController.getStaffList )
    .post('/staff/create', staffController.createStaff )
    .post('/staff/update', staffController.updateStaff)
    .post('/staff/delete', staffController.deleteStaff )

module.exports = routers
