const dbUtils = require('../utils/db');

class DiviModal {
  /**
   * 根据部门查找部门
   * @param  {object} department    部门
   * @return {object|null}          返回部门信息或者null
   */
  static async getDiviByDepartment(department) {
    let _sql = 'SELECT * FROM ?? WHERE department = ? limit 1 ';
    let result = await dbUtils.query(_sql, ['divi', department]);
    if (Array.isArray(result) && result.length > 0) {
      result = result[0];
    } else {
      result = null;
    }
    return result;
  }

  /**
   * 根据部门信息查找部门
   * @param  {object} depinfo   部门信息
   * @return {object|null}      返回部门信息或者null
   */
  static async getDiviByDepInfo(depinfo) {
    let _sql = 'SELECT * FROM ?? WHERE depinfo = ? limit 1 ';
    let result = await dbUtils.query(_sql, ['divi', depinfo]);
    if (Array.isArray(result) && result.length > 0) {
      result = result[0];
    } else {
      result = null;
    }
    return result;
  }

  /**
   * 根据部门、部门信息创建部门
   * @param  {object} options 部门、部门信息
   * @return {object|null}    部门信息或null
   */
  static async createDivi(options) {
    let result = await this.getDiviByDepartment(options.department);
    if (result) {
      result = null;
      return result;
    }
    result = await this.getDiviByDepInfo(options.depinfo);
    if (result) {
      result = null;
      return result;
    }

    let currentTime = new Date().getTime();
    options.createTime = currentTime;
    options.updateTime = currentTime;
    let insertResult = await dbUtils.insertData('Divi', options);
    if (insertResult && insertResult.insertId) {
      let res = await dbUtils.findDataById('Divi', insertResult.insertId);
      if (res && res.length > 0) {
        result = res[0];
      }
    }
    return result;
  }
}

module.exports = DiviModal;
