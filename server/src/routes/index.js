const router = require('koa-router')();

const user = require('./user');
const staff = require('./staff');
const job = require('./job');
const divi = require('./divi');
const ann = require('./ann');

router.use('/api', user.routes(), user.allowedMethods());
router.use('/api', staff.routes(), staff.allowedMethods());
router.use('/api', job.routes(), job.allowedMethods());
router.use('/api', divi.routes(), divi.allowedMethods());
router.use('/api', ann.routes(), ann.allowedMethods());

module.exports = router
