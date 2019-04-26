const dbUtils = require("../utils/db");

class StaffModal {
  /**
   * 根据姓名查找员工
   * @param {object} name  姓名
   * @return {object|null}    返回员工信息或nul
   */
  static async getStaffByName(name) {
    let _sql = "SELECT * FROM ?? WHERE name = ? limit 1 ";
    let result = await dbUtils.query(_sql, ["staff", name]);
    if (Array.isArray(result) && result.length > 0) {
      result = result[0];
    } else {
      result = null;
    }
    return result;
  }

  /**
   * 根据部门查找员工
   * @param  {object} department    部门
   * @return {object|null}          返回员工信息或者null
   */
  static async getStaffByDepartment(department) {
    let _sql = "SELECT * FROM ?? WHERE department = ? limit 1 ";
    let result = await dbUtils.query(_sql, ["staff", department]);
    if (Array.isArray(result) && result.length > 0) {
      result = result[0];
    } else {
      result = null;
    }
    return result;
  }

  /**
   * 根据职位查找员工
   * @param  {object} jobname   职位
   * @return {object|null}      返回员工信息或者null
   */
  static async getStaffByJobName(jobname) {
    let _sql = "SELECT * FROM ?? WHERE jobname = ? limit 1 ";
    let result = await dbUtils.query(_sql, ["staff", jobname]);
    if (Array.isArray(result) && result.length > 0) {
      result = result[0];
    } else {
      result = null;
    }
    return result;
  }

  /**
   * 根据入职时间查找员工
   * @param  {object} jobtime   入职时间
   * @return {object|null}      返回员工信息或者null
   */
  static async getStaffByJobTime(jobtime) {
    let _sql = "SELECT * FROM ?? WHERE jobtime = ? limit 1 ";
    let result = await dbUtils.query(_sql, ["staff", jobtime]);
    if (Array.isArray(result) && result.length > 0) {
      result = result[0];
    } else {
      result = null;
    }
    return result;
  }

  /**
   * 根据姓名、部门、职位、入职时间创建员工
   * @param  {object} options 姓名、部门、职位、入职时间
   * @return {object|null}    员工信息或null
   */
  static async createStaff(options) {
    let result = await this.getStaffByName(options.name);
    if (result) {
      result = null;
      return result;
    }
    result = await this.getStaffByDepartment(options.department);
    if (result) {
      result = null;
      return result;
    }
    result = await this.getStaffByJobName(options.jobname);
    if (result) {
      result = null;
      return result;
    }
    result = await this.getStaffByJobTime(options.jobtime);
    if (result) {
      result = null;
      return result;
    }

    let currentTime = new Date().getTime();
    options.createTime = currentTime;
    options.updateTime = currentTime;
    let insertResult = await dbUtils.insertData("staff", options);
    if (insertResult && insertResult.insertId) {
      let res = await dbUtils.findDataById("staff", insertResult.insertId);
      if (res && res.length > 0) {
        result = res[0];
      }
    }
    return result;
  }
}

module.exports = StaffModal;
