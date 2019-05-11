const staffModel = require('../models/staff');
const handle = require('../utils/handle');

class StaffController {
    /**
     * 获取员工列表
     */
    static async getStaffList(ctx) {
        let result = handle.response(false, '获取列表失败', null, 201);

        let staffResult = await staffModel.getStaffList();
        if (staffResult) {
            result = handle.response(true, '', staffResult, 200);
        }
        ctx.body = result;
    }

    /**
     * 添加员工
     * @param {*}   ctx
     */
    static async createStaff(ctx) {
        let result = handle.response(false, "创建失败", null, 201);

        let formData = ctx.request.body;
        let staffResult = await staffModel.createStaff({
            name: formData.name,
            department: formData.department,
            jobname: formData.jobname,
            jobtime: formData.jobtime,
        });
        if (staffResult) {
            result = handle.response(true, '', staffResult, 200);
        }
        ctx.body = result;
    }

    /**
     * 删除员工
     * @param {*} ctx
     */
    static async deleteStaff(ctx) {
        let result = handle.response(false, '删除失败', null, 201);

        let formData = ctx.request.body;
        await staffModel.deleteStaff(formData.id);
        result = handle.response(true, '删除成功', null, 200);

        ctx.body = result;
    }

}

module.exports = StaffController;