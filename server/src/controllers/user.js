const userModel = require('../models/user');
const handle = require('../utils/handle');
const jsonwebtoken = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const jwt = require('../utils/config').jwt;

class UserController {
  /**
   * 登录操作
   * @param  {obejct} ctx 上下文对象
   */
  static async signIn(ctx) {
    let formData = ctx.request.body;
    let result = handle.response(false, '登录失败', null, 201);
    let userResult = await userModel.getUserByUserName(formData.username);
    if (userResult) {
      // 解密加密密码 与输入的密码比较
      if (await bcrypt.compare(formData.password, userResult.password)) {
        delete userResult.password;
        result = handle.response(true, '登录成功', userResult, 200);
        let token = jsonwebtoken.sign(
          {
            data: userResult,
            exp: Math.floor(Date.now() / 1000) + Number(jwt.exprisesIn)
          },
          jwt.secret
        );
        ctx.cookies.set('token', token);
      } else {
        result = handle.response(false, '密码错误', null, 201);
      }
    } else {
      result = handle.response(false, '用户不存在', null, 201);
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
      message: 'success',
      data: null,
      code: '200'
    };
    ctx.cookies.set('token', null);
    ctx.body = result;
  }

  /**
   * 获取用户列表
   */
  static async getUserList(ctx) {
    let result = handle.response(false, '获取列表失败', null, 201);
    let offset = parseInt(ctx.request.query.offset);
    let pageSize = parseInt(ctx.request.query.pageSize);
    let userResult = await userModel.getUserList(offset, pageSize);
    if (userResult) {
        result = handle.response(true, '', userResult, 200);
    }
    ctx.body = result;
  }

  /**
   * 创建用户
   * @param {*} ctx
   */
  static async createUser(ctx) {
    let result = handle.response(false, '创建失败', null, 201);

    let formData = ctx.request.body;
    let userResult = await userModel.createUser({
      username: formData.username,
      department: formData.department
    });

    if (userResult) {
      result = handle.response(true, '创建成功', null, 200);
    }
    ctx.body = result;
  }

  /**
   * 删除用户
   * @param {*} ctx
   */
  static async deleteUser(ctx) {
    let result = handle.response(false, '删除失败', null, 201);

    let formData = ctx.request.body;
    await userModel.deleteUser(formData.id);
    result = handle.response(true, '删除成功', null, 200);

    ctx.body = result;
  }

}

module.exports = UserController;
