const dbUtils = require('../utils/db');

class StaffModal {
  /**
   * 查找员工列表
   * @return {Array} 返回员工信息
   * @param {Number} offset 从第offset页开始查询
   * @param {Number} pageSize 每次查询条数
   */
  static async getStaffList(offset, pageSize) {
    let totalResult = await dbUtils.selectAll('staff');
    let result = await dbUtils.findDataByPage('staff', '*', offset, pageSize);
    if (Array.isArray(result) && result.length > 0) {
      return { list: result, total: totalResult.length};
    } else {
      result = [];
      return { result, total: 0};
    }
  }

  /**
   * 根据姓名、部门、职位、入职时间创建员工
   * @param  {object} options 姓名、部门、职位、入职时间
   * @return {object|null}    员工信息或null
   */
  static async createStaff(options) {
    let insertResult = await dbUtils.insertData('staff', options);
    if (insertResult && insertResult.insertId) {
      let res = await dbUtils.findDataById('staff', insertResult.insertId);
      if (res && res.length > 0) {
        return res[0];
      }
    }
    return null;
  }

  /**
   * 删除员工
   * @param {*} id 
   */
  static async deleteStaff (id) {
    return await dbUtils.deleteDataById('staff', id);
  }
}

module.exports = StaffModal;
