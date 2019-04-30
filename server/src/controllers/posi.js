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
}

module.exports = PosiController;