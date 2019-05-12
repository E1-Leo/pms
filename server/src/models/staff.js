const dbUtils = require('../utils/db');

class StaffModal {
  /**
   * 查找员工列表
   * @return {Array}    返回员工信息
   */
  static async getStaffList() {
    let result = await dbUtils.selectAll('staff');
    if (Array.isArray(result) && result.length > 0) {
      return result;
    } else {
      return [];
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
