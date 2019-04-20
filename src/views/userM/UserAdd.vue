<template>
  <div>
    <div class="add">
      <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="80" class="form">
        <FormItem label="用户名" prop="loginName">
            <Input type="text" v-model="formCustom.loginName" />
        </FormItem>
        <FormItem label="密码" prop="passwd">
            <Input type="password" v-model="formCustom.passwd" />
        </FormItem>
        <FormItem label="确认密码" prop="passwdCheck">
            <Input type="password" v-model="formCustom.passwdCheck" />
        </FormItem>
        <FormItem label="部门" prop="diviName">
            <Select style="width:200px" v-model="formCustom.diviName">
              <Option value="as">行政部</Option>
              <Option value="td">技术部</Option>
              <Option value="od">运营部</Option>
              <Option value="ad">财务部</Option>
              <Option value="sd">销售部</Option>
            </Select>
        </FormItem>
        <FormItem>
            <Button type="primary" @click="handleSubmit('formCustom')" style="margin-right: 20px;">Submit</Button>
            <Button @click="handleReset('formCustom')" style="margin-left: 8px">Reset</Button>
        </FormItem>
    </Form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
      const validatePass = (rule, value, callback) => {
          if (value === '') {
              callback(new Error('请输入您的密码'));
          } else {
              if (this.formCustom.passwdCheck !== '') {
                  // 对第二个密码框单独验证
                  this.$refs.formCustom.validateField('passwdCheck');
              }
              callback();
          }
      };
      const validatePassCheck = (rule, value, callback) => {
          if (value === '') {
              callback(new Error('请重新输入您的密码'));
          } else if (value !== this.formCustom.passwd) {
              callback(new Error('两个密码不一样!'));
          } else {
              callback();
          }
      };
      const validatelogName = (rule, value, callback) => {
          if (!value) {
              return callback(new Error('用户名不能为空'));
          }
      };
      
      return {
          formCustom: {
              loginName: '',
              passwd: '',
              passwdCheck: '',
              diviName: ''
          },
          ruleCustom: {
              passwd: [
                  { validator: validatePass, trigger: 'blur' }
              ],
              passwdCheck: [
                  { validator: validatePassCheck, trigger: 'blur' }
              ],
              loginName: [
                  { validator: validatelogName, trigger: 'blur' }
              ]
          }
      }
  },
  methods: {
      handleSubmit (name) {
          this.$refs[name].validate((valid) => {
              if (valid) {
                  this.$Message.success('Success!');
              } else {
                  this.$Message.error('Fail!');
              }
          })
      },
      handleReset (name) {
          this.$refs[name].resetFields();
      }
  }
}
</script>

<style scoped>
.add {
  text-align: center;
  margin-top: 25px;
  margin:0 auto;
  padding-top: 30px;
}

.form {
  display: inline-block;
  width: 30%;
}
</style>
