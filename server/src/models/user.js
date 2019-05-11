const dbUtils = require('../utils/db');

class UserModal {

  /**
   * 根据用户名查找用户
   * @param  {object} username  用户名
   * @return {object|null}      返回用户信息或者null
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
   * 根据密码查找用户
   * @param {object} password   密码
   * @return {object|null}      返回用户信息或nul
  */
  static async getUserByPassword(options) {
    let _sql = "SELECT * FROM ?? WHERE password = ? limit 1 "
    let result = await dbUtils.query(_sql, ['user', password])
    if (Array.isArray(result) && result.length > 0) {
      result = result[0];
    } else {
      result = null;
    }
    return result;
  }

  /**
 * 根据部门查找用户
 * @param  {object} department    部门
 * @return {object|null}          返回用户信息或者null
 */
  static async getUserByDepartment(department) {
    let _sql = "SELECT * FROM ?? WHERE department = ? limit 1 "
    let result = await dbUtils.query(_sql, ['user', department])
    if (Array.isArray(result) && result.length > 0) {
      result = result[0];
    } else {
      result = null;
    }
    return result;
  }

  /**
   * 根据用户名、密码、部门创建用户
   * @param  {object} options 用户名、密码、部门
   * @return {object|null}    用户信息或null
   */
  static async createUser(options) {
    let result = await this.getUserByUserName(options.username);
    if (result) {
      result = null;
      return result;
    }
    result = await this.getUserByDepartment(options.department)
    if (result) {
      result = null;
      return result;
    }
    let insertResult = await dbUtils.insertData('user', options);
    if (insertResult && insertResult.insertId) {
      let res = await dbUtils.findDataById('user', insertResult.insertId)
      if (res && res.length > 0) {
        result = res[0];
      }
    }
    return result;
  }

}

module.exports = UserModal;
