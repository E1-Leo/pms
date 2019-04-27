const userModel = require("../models/user");
const handle = require("../utils/handle");
const jsonwebtoken = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const jwt = require("../utils/config").jwt;

class UserController {
  /**
   * 登录操作
   * @param  {obejct} ctx 上下文对象
   */
  static async signIn(ctx) {
    let formData = ctx.request.body;
    let result = {
      success: false,
      message: "",
      data: null,
      code: ""
    };
    let userResult = await userModel.getUserByUserName(formData.username);
    if (userResult) {
      if (await bcrypt.compare(formData.password, userResult.password)) {
        result.success = true;
        delete userResult.password;
        result.data = userResult;
        let token = jsonwebtoken.sign(
          {
            data: userResult,
            exp: Math.floor(Date.now() / 1000) + Number(jwt.exprisesIn)
          },
          jwt.secret
        );
        ctx.cookies.set("token", token);
      } else {
        result.message = handle.message.FAIL_USER_NAME_OR_PASSWORD_ERROR;
        result.code = "FAIL_USER_NAME_OR_PASSWORD_ERROR";
      }
    } else {
      result.code = "FAIL_USER_NO_EXIST";
      result.message = handle.message.FAIL_USER_NO_EXIST;
    }
    ctx.body = result;
  }

  /**
   * 退出登录
   * @param  {obejct} ctx 上下文对象
   */
  static async signOut(ctx) {
    let result = {
      success: true,
      message: "success",
      data: null,
      code: "200"
    };
    ctx.cookies.set("token", null);
    ctx.body = result;
  }
}

module.exports = UserController;
