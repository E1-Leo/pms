<template>
  <div>
    <div class="add">
      <i-form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="80" class="form">
        <FormItem label="用户名" prop="username">
          <Input type="text" v-model="formCustom.username"/>
        </FormItem>
        <FormItem label="密码" prop="passwd">
          <Input type="password" v-model="formCustom.passwd"/>
        </FormItem>
        <FormItem label="确认密码" prop="passwdCheck">
          <Input type="password" v-model="formCustom.passwdCheck"/>
        </FormItem>
        <FormItem label="部门" prop="department">
          <Select style="width:200px" v-model="formCustom.department">
            <Option value="行政部">行政部</Option>
            <Option value="技术部">技术部</Option>
            <Option value="运营部">运营部</Option>
            <Option value="财务部">财务部</Option>
            <Option value="销售部">销售部</Option>
          </Select>
        </FormItem>
        <FormItem>
          <i-button
            type="primary"
            @click="handleSubmit('formCustom')"
            style="margin-right: 20px;"
          >Submit</i-button>
          <Button @click="handleReset('formCustom')" style="margin-left: 8px">Reset</Button>
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
      callback(); 
    };

    return {
      formCustom: {
        username: '',
        passwd: '',
        passwdCheck: '',
        department: ''
      },
      ruleCustom: {
        passwd: [{ validator: validatePass, trigger: 'blur' }],
        passwdCheck: [{ validator: validatePassCheck, trigger: 'blur' }],
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
            passwd: this.formCustom.passwd,
            department: this.formCustom.department
          })
          .then(({data}) => {
            if ( data.success ) {
              this.$Message.success('Success!');
              this.$router.push('/userlist')
            }
          });
        } else {
          this.$Message.error('Fail!');
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
