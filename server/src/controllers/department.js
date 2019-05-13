const departmentModel = require('../models/department');
const handle = require('../utils/handle');

class DepartmentController {
  /**
   * 获取部门列表
   */
  static async getDepartmentList(ctx) {
    let result = handle.response(false, '获取列表失败', null, 201);
    let offset = parseInt(ctx.request.query.offset);
    let pageSize = parseInt(ctx.request.query.pageSize);
    let departmentResult = await departmentModel.getDepartmentList(offset, pageSize);
    if (departmentResult) {
      result = handle.response(true, '', departmentResult, 200);
    }
    ctx.body = result;
  }

  /**
   * 添加部门
   * @param {*}   ctx
   */
  static async createDepartment(ctx) {
    let result = handle.response(false, '创建失败', null, 201);

    let formData = ctx.request.body;
    let departmentResult = await departmentModel.createDepartment({
      department: formData.department,
      departmentinfo: formData.departmentinfo
    });
    
    if (departmentResult) {
      result = handle.response(true, '', departmentResult, 200);
    }
    ctx.body = result;
  }

  /**
   * 删除部门
   * @param {*} ctx
   */
  static async deleteDepartment(ctx) {
    let result = handle.response(false, '删除失败', null, 201);

    let formData = ctx.request.body;
    await departmentModel.deleteDepartment(formData.id);
    result = handle.response(true, '删除成功', null, 200);

    ctx.body = result;
  }
}

module.exports = DepartmentController;
