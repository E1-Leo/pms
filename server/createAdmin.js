const bcrypt = require('bcrypt');
const userModel = require('./src/models/user');

let argv = process.argv;
if (argv.length < 5) {
    console.error('请输入 username password department');
    process.exit(1);
}

let username = argv[2];
let department = argv[4];

bcrypt.hash(argv[3], 10).then(function (password) {
   userModel.createUser({
       'username': username,
       'password': password,
       'department': department
   }).then(function(result) {
        if (result) {
            console.log('创建成功！\n用户信息如下：');
            console.log(result);
        } else {
            console.log('创建失败！\n请校验如下信息：\n1.数据库配置是否正确\n2.要创建的用户名是否已经存在');
        }
        process.exit(1);
   }).catch(function (e) {
    console.log(e);
    process.exit(1);
    });
}).catch(function (e) {
    console.log(e);
    process.exit(1);
});


