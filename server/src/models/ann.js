const dbUtils = require("../utils/db");

class AnnModal {
  /**
   * 根据公告标题查找公告
   * @param  {object} anntitle      公告
   * @return {object|null}          返回公告信息或者null
   */
  static async getAnnByAnnTitle(anntitle) {
    let _sql = "SELECT * FROM ?? WHERE anntitle = ? limit 1 ";
    let result = await dbUtils.query(_sql, ["ann", anntitle]);
    if (Array.isArray(result) && result.length > 0) {
      result = result[0];
    } else {
      result = null;
    }
    return result;
  }

  /**
   * 根据公告信息查找公告
   * @param  {object} anninfo   公告信息
   * @return {object|null}      返回公告信息或者null
   */
  static async getAnnByAnnInfo(anninfo) {
    let _sql = "SELECT * FROM ?? WHERE anninfo = ? limit 1 ";
    let result = await dbUtils.query(_sql, ["ann", anninfo]);
    if (Array.isArray(result) && result.length > 0) {
      result = result[0];
    } else {
      result = null;
    }
    return result;
  }

  /**
   * 根据发布时间查找公告
   * @param  {object} time      发布时间
   * @return {object|null}      返回公告信息或者null
   */
  static async getAnnByTime(time) {
    let _sql = "SELECT * FROM ?? WHERE time = ? limit 1 ";
    let result = await dbUtils.query(_sql, ["ann", time]);
    if (Array.isArray(result) && result.length > 0) {
      result = result[0];
    } else {
      result = null;
    }
    return result;
  }

  /**
   * 根据发布人查找公告
   * @param  {object} username  发布人
   * @return {object|null}      返回公告信息或者null
  */
 static async getUserByUserName(username) {
    let _sql = "SELECT * FROM ?? WHERE username = ? limit 1 "
    let result = await dbUtils.query(_sql, ['user', username])
    if (Array.isArray(result) && result.length > 0) {
      result = result[0];
    } else {
      result = null;
    }
    return result;
  }

  /**
   * 根据公告、公告信息、发布时间、发布人创建公告
   * @param  {object} options 公告、公告信息、发布时间、发布人
   * @return {object|null}    公告信息或null
   */
  static async createAnn(options) {
    let result = await this.getAnnByAnnTitle(options.anntitle);
    if (result) {
      result = null;
      return result;
    }
    result = await this.getAnnByAnnInfo(options.anninfo);
    if (result) {
      result = null;
      return result;
    }
    result = await this.getAnnByTime(options.time);
    if (result) {
      result = null;
      return result;
    }
    result = await this.getUserByUserName(options.username);
    if (result) {
      result = null;
      return result;
    }

    let currentTime = new Date().getTime();
    options.createTime = currentTime;
    options.updateTime = currentTime;
    let insertResult = await dbUtils.insertData("ann", options);
    if (insertResult && insertResult.insertId) {
      let res = await dbUtils.findDataById("ann", insertResult.insertId);
      if (res && res.length > 0) {
        result = res[0];
      }
    }
    return result;
  }
}

module.exports = AnnModal;
