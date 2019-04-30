const diviModel = require("../models/divi");
const handle = require("../utils/handle");

class DiviController {
    /**
     * 获取部门列表
     */
    static async getDiviList(ctx) {
        let result = handle.response(false, '获取列表失败', null, 201);

        let diviResult = await diviModel.getDiviList();
        if (diviResult) {
            result = handle.response(true, '', diviResult, 200);
        }
        ctx.body = result;
    }

    /**
     * 添加部门
     * @param {*}   ctx
     */
    static async createDivi(ctx) {

    }
    


}

module.exports = DiviController;
