const router = require('koa-router')();

const user = require('./user');
const staff = require('./staff');
const department = require('./department');
const announcement = require('./announcement');

router.use('/api', user.routes(), user.allowedMethods());
router.use('/api', staff.routes(), staff.allowedMethods());
router.use('/api', department.routes(), department.allowedMethods());
router.use('/api', announcement.routes(), announcement.allowedMethods());

module.exports = router
