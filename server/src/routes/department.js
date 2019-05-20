/**
 * restful api 子路由
 */

const router = require('koa-router')()
const checkAuth = require('../middleswares/checkAuth');
const departmentController = require('../controllers/department');

const routers = router
    .get('/department/list', checkAuth, departmentController.getDepartmentList )
    .get('/department/alllist', checkAuth, departmentController.getDepartmentAllList )
    .post('/department/create', checkAuth, departmentController.createDepartment )
    .post('/department/update', checkAuth, departmentController.updateDepartment )
    .post('/department/delete', checkAuth, departmentController.deleteDepartment )

module.exports = routers
