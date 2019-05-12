/**
 * restful api 子路由
 */

const router = require('koa-router')()
const checkAuth = require('../middleswares/checkAuth');
const jobController = require('../controllers/job');

const routers = router
    .get('/job/list', jobController.getJobList )
    .post('/job/create', jobController.createJob )
    .post('/job/delete', jobController.deleteJob )

module.exports = routers
