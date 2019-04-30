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

    
}

module.exports = AnnController;