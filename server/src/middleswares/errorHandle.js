const handle = require('../utils/handle');

/**
 * 判断token是否可用
 */

const errorHandle = (ctx, next) => {
  return next().catch((err) => {
    let result = {
      success: false,
      message: handle.message.ERROR_SYS,
      data: null,
      code: handle.code.ERROR_CODE
    }
    if (err.status === 401) {
      // 没有权限访问（未登录）
      ctx.status = 200;
      result.code = handle.code.ERROR_LOGIN_CODE;
      result.message = handle.message.FAIL_USER_NO_LOGIN;
      ctx.body = result;
    } else {
      ctx.body = result;
    }
  });
}

module.exports = errorHandle;