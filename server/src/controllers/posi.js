const posiModel = require('../models/posi');
const handle = require('../utils/handle');

class PosiController {
    /**
     * 获取职位列表
     */
    static async getPosiList(ctx) {
        let result = handle.response(false, '获取列表失败', null, 201);

        let posiResult = await posiModel.getPosiList();
        if (posiResult) {
            result = handle.response(true, '', posiResult, 200);
        }
        ctx.body = result;
    }

    /**
     * 添加职位
     * @param {*}   ctx
     */
    static async createPosi(ctx) {
        let result = handle.response(false, "创建失败", null, 201);

        let formData = ctx.request.body;
        let posiResult = await posiModel.createPosi({
            jobname: formData.jobname,
            jobinfo: formData.jobinfo,
            banci: formData.banci,
        });
        if (posiResult) {
            result = handle.response(true, '', posiResult, 200);
        }
        ctx.body = result;
    }

    /**
     * 删除职位
     * @param {*} ctx
     */
    static async deletePosi(ctx) {
        let result = handle.response(false, '删除失败', null, 201);

        let formData = ctx.request.body;
        await posiModel.deletePosi(formData.id);
        result = handle.response(true, '删除成功', null, 200);

        ctx.body = result;
    }
}

module.exports = PosiController;