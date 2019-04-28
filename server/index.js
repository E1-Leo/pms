const App = require('./src/app');

let koa = new App().koa;
koa.listen(8060, () => {
    console.log('Node is listening in 8060');
});
