const dbUtils = require('../utils/db');

class DepartmentModal {

  /**
   * 查找部门列表
   * @return {Array}     返回部门信息
   */
  static async getDepartmentList(offset, pageSize) {
    let totalResult = await dbUtils.selectAll('department');
    let result = await dbUtils.findDataByPage('department', '*', offset, pageSize);
    if (Array.isArray(result) && result.length > 0) {
      return {list: result, total: totalResult.length};
    } else {
      result = [];
      return {result, total: 0};
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
        return res[0];
      }
    }
    return null;
  }

  /**
   * 删除部门
   */
  static async deleteDepartment(id) {
    return await dbUtils.deleteDataById('department', id);
  }
}

module.exports = DepartmentModal;
