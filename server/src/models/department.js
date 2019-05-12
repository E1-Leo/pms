const dbUtils = require('../utils/db');

class DepartmentModal {
  /**
   * 根据部门查找部门
   * @param  {object} department    部门
   * @return {object|null}          返回部门信息或者null
   */
  static async getDepartmentByDepartment(department) {
    let _sql = 'SELECT * FROM ?? WHERE department = ? limit 1 ';
    let result = await dbUtils.query(_sql, ['department', department]);
    if (Array.isArray(result) && result.length > 0) {
      result = result[0];
    } else {
      result = null;
    }
    return result;
  }

  /**
   * 根据部门信息查找部门
   * @param  {object} departmentinfo   部门信息
   * @return {object|null}      返回部门信息或者null
   */
  static async getDepartmentByDepartmentInfo(departmentinfo) {
    let _sql = 'SELECT * FROM ?? WHERE departmentinfo = ? limit 1 ';
    let result = await dbUtils.query(_sql, ['department', departmentinfo]);
    if (Array.isArray(result) && result.length > 0) {
      result = result[0];
    } else {
      result = null;
    }
    return result;
  }

  /**
   * 查找部门列表
   * @return {Array}     返回部门信息
   */
  static async getDepartmentList() {
    let result = await dbUtils.selectAll('department');
    if (Array.isArray(result) && result.length > 0) {
      return result;
    } else {
      return [];
    }
  }

  /**
   * 根据部门、部门信息创建部门
   * @param  {object} options 部门、部门信息
   * @return {object|null}    部门信息或null
   */
  static async createDepartment(options) {
    let insertResult = await dbUtils.insertData('department', options);
    if (insertResult && insertResult.insertId) {
      let res = await dbUtils.findDataById('department', insertResult.insertId);
      if (res && res.length > 0) {
        result = res[0];
      }
    }
    return result;
  }

  /**
   * 删除部门
   */
  static async deleteDepartment(id) {
    return await dbUtils.deleteDataById('department', id);
  }
}

module.exports = DepartmentModal;
