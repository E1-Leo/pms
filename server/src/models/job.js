const dbUtils = require('../utils/db');

class JobModal {

  /**
   * 查找职位列表
   * @param {Array}     返回职位信息 
   */
  static async getJobList() {
    let result = await dbUtils.selectAll('job');
    if (Array.isArray(result) && result.length > 0) {
      return result;
    } else {
      return [];
    }
  }

  /**
   * 根据职位查找职位
   * @param  {object} jobname   职位
   * @return {object|null}      返回职位信息或者null
   */
  static async getJobByJobName(jobname) {
    let _sql = 'SELECT * FROM ?? WHERE jobname = ? limit 1 ';
    let result = await dbUtils.query(_sql, ['job', jobname]);
    if (Array.isArray(result) && result.length > 0) {
      result = result[0];
    } else {
      result = null;
    }
    return result;
  }

  /**
   * 根据职位信息查找职位
   * @param  {object} jobinfo   职位信息
   * @return {object|null}      返回职位信息或者null
   */
  static async getJobByJobInfo(jobinfo) {
    let _sql = 'SELECT * FROM ?? WHERE jobinfo = ? limit 1 ';
    let result = await dbUtils.query(_sql, ['job', jobinfo]);
    if (Array.isArray(result) && result.length > 0) {
      result = result[0];
    } else {
      result = null;
    }
    return result;
  }

  /**
   * 根据班次查找职位
   * @param  {object} banci     班次
   * @return {object|null}      返回职位信息或者null
   */
  static async getJobByBanci(banci) {
    let _sql = 'SELECT * FROM ?? WHERE banci = ? limit 1 ';
    let result = await dbUtils.query(_sql, ['job', banci]);
    if (Array.isArray(result) && result.length > 0) {
      result = result[0];
    } else {
      result = null;
    }
    return result;
  }

  /**
   * 根据职位、入职时间创建职位
   * @param  {object} options 姓名、部门、职位、入职时间
   * @return {object|null}    职位信息或null
   */
  static async createJob(options) {

    let currentTime = new Date().getTime();
    options.createTime = currentTime;
    options.updateTime = currentTime;
    let insertResult = await dbUtils.insertData('job', options);
    if (insertResult && insertResult.insertId) {
      let res = await dbUtils.findDataById('job', insertResult.insertId);
      if (res && res.length > 0) {
        result = res[0];
      }
    }
    return result;
  }

  /**
   * 删除职位
   * @param {*} id
   */
  static async deleteJob(id) {
    return await dbUtils.deleteDataById('job', id);
  }

}

module.exports = JobModal;
