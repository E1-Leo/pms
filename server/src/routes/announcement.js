/**
 * restful api 子路由
 */

const router = require('koa-router')()
const checkAuth = require('../middleswares/checkAuth');
const announcementController = require('../controllers/announcement');

const routers = router
    .get('/announcement/list', announcementController.getAnnouncementList )
    .post('/announcement/create', announcementController.createAnnouncement )
    .post('/announcement/update', announcementController.updateAnnouncement )
    .post('/announcement/delete', announcementController.deleteAnnouncement )

module.exports = routers

