const annModel = require('../models/ann');
const handle = require('../utils/handle');

class AnnController {
    /**
     * 获取公告列表
     */
    static async getAnnList(ctx) {
        let result = handle.response(false, '获取列表失败', null, 201);

        let annResult = await annModel.getAnnList();
        if (annResult) {
            result = handle.response(true, '', annResult, 200);
        }
        ctx.body = result;
    }
    /**
     * 添加公告
     * @param {*} ctx
     */
    static async createAnn(ctx) {
        let result = handle.response(false, "创建失败", null, 201);

        let formData = ctx.request.body;
        let annResult = await annModel.createAnn({
            anntitle: formData.anntitle,
            anninfo: formData.anninfo,
            time: formData.time,
            username: formData.username,
        });
        if (annResult) {
            result = handle.response(true, '', annResult, 200);
        }
        ctx.body = result;
    }

    /**
     * 删除公告
     * @param {*} ctx
     */
    static async deleteAnn(ctx) {
        let result = handle.response(false, '删除失败', null, 201);

        let formData = ctx.request.body;
        await annModel.deleteAnn(formData.id);
        result = handle.response(true, '删除成功', null, 200);

        ctx.body = result;
    }
}

module.exports = AnnController;