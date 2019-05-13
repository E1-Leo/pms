const dbUtils = require('../utils/db');

class AnnouncementModal {

  /**
   * 查找公告列表
   * @return {Array}          返回公告信息
   * @param {Number} offset   从第offset页开始查询
   * @param {Number} pageSize 每次查询条数
   */
  static async getAnnouncementList(offset, pageSize) {
    let totalResult = await dbUtils.selectAll('announcement');
    let result = await dbUtils.findDataByPage('announcement', '*', offset, pageSize);
    if (Array.isArray(result) && result.length > 0) {
      return { list: result, total: totalResult.length};
    } else {
      result = [];
      return { result, total: 0};
    }
  }

  /**
   * 根据公告、公告信息、发布时间、发布人创建公告
   * @param  {object} options 公告、公告信息、发布时间、发布人
   * @return {object|null}    公告信息或null
   */
  static async createAnnouncement(options) {

    let insertResult = await dbUtils.insertData('announcement', options);
    if (insertResult && insertResult.insertId) {
      let res = await dbUtils.findDataById('announcement', insertResult.insertId);
      if (res && res.length > 0) {
        return res[0];
      }
    }
    return null;
  }

  /**
   * 删除公告
   * @param {*} id
   */
  static async deleteStaff (id) {
    return await dbUtils.deleteDataById('announcement', id);
  }
}

module.exports = AnnouncementModal;
