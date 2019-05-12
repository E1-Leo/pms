/**
 * restful api 子路由
 */

const router = require('koa-router')()
const checkAuth = require('../middleswares/checkAuth');
const departmentController = require('../controllers/department');

const routers = router
    .get('/department/list', departmentController.getDepartmentList )
    .post('/department/create', departmentController.createDepartment )
    .post('/department/delete', departmentController.deleteDepartment )

module.exports = routers
