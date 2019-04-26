
const message = {
    ERROR_SYS: '服务器异常',
    FAIL_USER_NAME_OR_PASSWORD_ERROR: '用户名或登录密码错误',
    FAIL_USER_NO_LOGIN: '请先登录',
    FAIL_USER_NO_EXIST: '用户不存在'
  }
  
  const code = {
    SUCCESS_CODE: 200, // 成功
    ERROR_DATA_CODE: 201,
    ERROR_CODE: 500, // 服务器异常
    ERROR_LOGIN_CODE: 401, // 未登录
  }
  
  /**
   * 
   * @param {Bool} success 是否成功
   * @param {String} message 错误提示
   * @param {Object} data 数据
   * @param {Number} code 返回码
   */
  const response = function (success = false, message = ERROR_CODE, data = null, code = ERROR_CODE) {
    return {
      success,
      message,
      data,
      code
    }
  }
  
  
  module.exports = {
    message,
    code,
    response
  }