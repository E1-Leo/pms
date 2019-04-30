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
}

module.exports = StaffController;