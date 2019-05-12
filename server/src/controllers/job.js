const jobModel = require('../models/job');
const handle = require('../utils/handle');

class JobController {
  /**
   * 获取职位列表
   */
  static async getJobList(ctx) {
    let result = handle.response(false, '获取列表失败', null, 201);

    let jobResult = await jobModel.getJobList();
    if (jobResult) {
      result = handle.response(true, '', jobResult, 200);
    }
    ctx.body = result;
  }

  /**
   * 添加职位
   * @param {*}   ctx
   */
  static async createJob(ctx) {
    let result = handle.response(false, '创建失败', null, 201);

    let formData = ctx.request.body;
    let jobResult = await jobModel.createJob({
      jobname: formData.jobname,
      jobinfo: formData.jobinfo,
      banci: formData.banci
    });
    if (jobResult) {
      result = handle.response(true, '', jobResult, 200);
    }
    ctx.body = result;
  }

  /**
   * 删除职位
   * @param {*} ctx
   */
  static async deleteJob(ctx) {
    let result = handle.response(false, '删除失败', null, 201);

    let formData = ctx.request.body;
    await jobModel.deleteJob(formData.id);
    result = handle.response(true, '删除成功', null, 200);

    ctx.body = result;
  }
}

module.exports = JobController;
