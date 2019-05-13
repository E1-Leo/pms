const announcementModel = require("../models/announcement");
const handle = require("../utils/handle");

class AnnouncementController {
  /**
   * 获取公告列表
   */
  static async getAnnouncementList(ctx) {
    let result = handle.response(false, "获取列表失败", null, 201);
    let offset = parseInt(ctx.request.query.offset);
    let pageSize = parseInt(ctx.request.query.pageSize);
    let announcementResult = await announcementModel.getAnnouncementList(offset, pageSize);
    if (announcementResult) {
      result = handle.response(true, "", announcementResult, 200);
    }
    ctx.body = result;
  }
  /**
   * 添加公告
   * @param {*} ctx
   */
  static async createAnnouncement(ctx) {
    let result = handle.response(false, "创建失败", null, 201);

    let formData = ctx.request.body;
    let announcementResult = await announcementModel.createAnnouncement({
      announcementtitle: formData.announcementtitle,
      announcementinfo: formData.announcementinfo,
      publishtime: formData.publishtime,
      publishname: formData.publishname
    });
    if (announcementResult) {
      result = handle.response(true, "", announcementResult, 200);
    }
    ctx.body = result;
  }

  /**
   * 删除公告
   * @param {*} ctx
   */
  static async deleteAnnouncement(ctx) {
    let result = handle.response(false, "删除失败", null, 201);

    let formData = ctx.request.body;
    await announcementModel.deleteAnnouncement(formData.id);
    result = handle.response(true, "删除成功", null, 200);

    ctx.body = result;
  }
}

module.exports = AnnouncementController;
