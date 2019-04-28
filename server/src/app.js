const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const routers = require('./routes/index');
const checkAuth = require('./middleswares/checkAuth');
const errorHandle = require('./middleswares/errorHandle');

class App {
  constructor() {
    this.koa = new Koa();
    // 配置ctx.body解析中间件
    this.koa.use(bodyParser());
    //使用errorHandle中间件
    this.koa.use(errorHandle);
    // 初始化路由中间件
    this.koa.use(routers.routes())
    this.koa.use(routers.allowedMethods());
  }
}

module.exports = App;
