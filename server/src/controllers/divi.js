const diviModel = require('../models/divi');
const handle = require('../utils/handle');

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
        let result = handle.response(false, '创建失败', null, 201);

        let formData = ctx.request.body;
        let diviResult = await diviModel.createDivi({
            department: formData.department,
            depinfo: formData.depinfo,
        });
        if (diviResult) {
            result = handle.response(true, '', diviResult, 200);
        }
        ctx.body = result;
    }

    /**
     * 删除部门
     * @param {*} ctx
     */
    static async deleteDivi(ctx) {
        let result = handle.response(false, '删除失败', null, 201);

        let formData = ctx.request.body;
        await diviModel.deleteDivi(formData.id);
        result = handle.response(true, '删除成功', null, 200);

        ctx.body = result;
    }

}

module.exports = DiviController;
