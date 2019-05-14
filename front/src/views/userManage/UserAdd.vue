<template>
  <div>
    <div class="add">
      <i-form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="80" class="form">
        <FormItem label="用户名" prop="username">
          <Input type="text" v-model="formCustom.username"/>
        </FormItem>
        <FormItem label="密码" prop="password">
          <Input type="password" v-model="formCustom.password"/>
        </FormItem>
        <FormItem label="确认密码" prop="passwordCheck">
          <Input type="password" v-model="formCustom.passwordCheck"/>
        </FormItem>
        <FormItem>
          <i-button
            type="primary"
            @click="handleSubmit('formCustom')"
            style="margin-right: 20px;"
          >提交</i-button>
          <Button @click="handleReset('formCustom')" style="margin-left: 8px">重置</Button>
        </FormItem>
      </i-form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入您的密码'));
      } else {
        if (this.formCustom.passwordCheck !== '') {
          // 对第二个密码框单独验证
          this.$refs.formCustom.validateField('passwordCheck');
        }
        callback();
      }
    };
    const validatePassCheck = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请重新输入您的密码'));
      } else if (value !== this.formCustom.password) {
        callback(new Error('两个密码不一样!'));
      } else {
        callback();
      }
    };
    const validatelogName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('用户名不能为空'));
      }
      callback(); 
    };

    return {
      formCustom: {
        username: '',
        password: '',
        passwordCheck: ''
      },
      ruleCustom: {
        password: [{ validator: validatePass, trigger: 'blur' }],
        passwordCheck: [{ validator: validatePassCheck, trigger: 'blur' }],
        username: [{ validator: validatelogName, trigger: 'blur' }]
      }
    };
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          axios.post('/api/user/create', {
            username: this.formCustom.username,
            password: this.formCustom.password
          })
          .then(({data}) => {
            if ( data.success ) {
              this.$Message.success('添加成功!');
              this.$router.push('/userlist')
            }
          });
        } else {
          this.$Message.error('提交失败!');
        }
      });
    },
    handleReset(name) {
      this.$refs[name].resetFields();
    }
  }
};
</script>

<style scoped>
.add {
  text-align: center;
  margin-top: 25px;
  margin: 0 auto;
  padding-top: 30px;
}

.form {
  display: inline-block;
  width: 30%;
}
</style>
