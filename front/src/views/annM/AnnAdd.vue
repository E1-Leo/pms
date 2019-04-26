<template>
  <div>
    <div class="add">
      <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="80" class="form">
        <FormItem label="公告标题" prop="annTitle">
            <Input v-model="formCustom.annTitle" type="text" placeholder="Enter title..." />
        </FormItem>
        <FormItem label="公告内容" prop="annInfo">
            <Input v-model="formCustom.annInfo" type="textarea" :rows="4" placeholder="Enter something..." />
        </FormItem>
        <FormItem label="发布时间" prop="time">
          <DatePicker type="date" v-model="formCustom.time" :options="options1" placeholder="Select date" style="width: 200px"></DatePicker>
        </FormItem>
        <FormItem label="发布人" prop="userName">
          <Input v-model="formCustom.userName" type="text" placeholder="Enter name..." />
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
      
      const validateannTitle = (rule, value, callback) => {
          if (!value) {
              return callback(new Error('公告标题不能为空'));
          }
      };
      const validateannInfo = (rule, value, callback) => {
          if (!value) {
              return callback(new Error('公告内容不能为空'));
          }
      };
      const validatetime = (rule, value, callback) => {
          if (!value) {
              return callback(new Error('发布时间不能为空'));
          }
      };
      const validateuserName = (rule, value, callback) => {
          if (!value) {
              return callback(new Error('发布人不能为空'));
          }
      };
      
      return {
          formCustom: {
            annTitle: '',
            annInfo: '',
            time: '',
            userName: '',
          },
          ruleCustom: {
            annTitle: [
              { validator: validateannTitle, trigger: 'blur' }
            ],
            annInfo: [
              { validator: validateannInfo, trigger: 'blur' }
            ],
            time: [
              { validator: validatetime, trigger: 'blur' }
            ],
            userName: [
              { validator: validateuserName, trigger: 'blur' }
            ]
          },
          options1: {
            shortcuts: [
                {
                  text: 'Today',
                  value () {
                      return new Date();
                  },
                  onClick: (picker) => {
                      this.$Message.info('Click today');
                  }
                },
                {
                  text: 'Yesterday',
                  value () {
                      const date = new Date();
                      date.setTime(date.getTime() - 3600 * 1000 * 24);
                      return date;
                  },
                  onClick: (picker) => {
                      this.$Message.info('Click yesterday');
                  }
                },
                {
                  text: 'One week',
                  value () {
                      const date = new Date();
                      date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                      return date;
                  },
                  onClick: (picker) => {
                      this.$Message.info('Click a week ago');
                  }
                }
            ]
          },
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
