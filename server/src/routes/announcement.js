/**
 * restful api 子路由
 */

const router = require('koa-router')()
const checkAuth = require('../middleswares/checkAuth');
const announcementController = require('../controllers/announcement');

const routers = router
    .get('/announcement/list', checkAuth, announcementController.getAnnouncementList )
    .post('/announcement/create', checkAuth, announcementController.createAnnouncement )
    .post('/announcement/update', checkAuth, announcementController.updateAnnouncement )
    .post('/announcement/delete', checkAuth, announcementController.deleteAnnouncement )

module.exports = routers

