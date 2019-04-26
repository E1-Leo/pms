const dbUtils = require("../utils/db");

class PosiModal {

  /**
   * 根据职位查找职位
   * @param  {object} jobname   职位
   * @return {object|null}      返回职位信息或者null
   */
  static async getPosiByJobName(jobname) {
    let _sql = "SELECT * FROM ?? WHERE jobname = ? limit 1 ";
    let result = await dbUtils.query(_sql, ["posi", jobname]);
    if (Array.isArray(result) && result.length > 0) {
      result = result[0];
    } else {
      result = null;
    }
    return result;
  }

  /**
   * 根据职位信息查找职位
   * @param  {object} jobinfo   职位信息
   * @return {object|null}      返回职位信息或者null
   */
  static async getPosiByJobInfo(jobinfo) {
    let _sql = "SELECT * FROM ?? WHERE jobinfo = ? limit 1 ";
    let result = await dbUtils.query(_sql, ["posi", jobinfo]);
    if (Array.isArray(result) && result.length > 0) {
      result = result[0];
    } else {
      result = null;
    }
    return result;
  }

  /**
   * 根据班次查找职位
   * @param  {object} banci     班次
   * @return {object|null}      返回职位信息或者null
   */
  static async getPosiByBanci(banci) {
    let _sql = "SELECT * FROM ?? WHERE banci = ? limit 1 ";
    let result = await dbUtils.query(_sql, ["posi", banci]);
    if (Array.isArray(result) && result.length > 0) {
      result = result[0];
    } else {
      result = null;
    }
    return result;
  }

  /**
   * 根据职位、入职时间创建职位
   * @param  {object} options 姓名、部门、职位、入职时间
   * @return {object|null}    职位信息或null
   */
  static async createposi(options) {
    let result = await this.getPosiByJobName(options.jobname);
    if (result) {
      result = null;
      return result;
    }
    result = await this.getPosiByJobInfo(options.jobinfo);
    if (result) {
      result = null;
      return result;
    }
    result = await this.getPosiByBanci(options.banci);
    if (result) {
      result = null;
      return result;
    }

    let currentTime = new Date().getTime();
    options.createTime = currentTime;
    options.updateTime = currentTime;
    let insertResult = await dbUtils.insertData("posi", options);
    if (insertResult && insertResult.insertId) {
      let res = await dbUtils.findDataById("posi", insertResult.insertId);
      if (res && res.length > 0) {
        result = res[0];
      }
    }
    return result;
  }
}

module.exports = PosiModal;
