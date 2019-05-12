<template>
  <div>
    <div class="add">
      <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="80" class="form">
        <FormItem label="职位名" prop="jobName">
          <Input v-model="formCustom.jobName" type="text"/>
        </FormItem>
        <FormItem label="职位信息" prop="jobInfo">
          <Input
            v-model="formCustom.jobInfo"
            type="textarea"
            :rows="4"
            placeholder="Enter something..."
          />
        </FormItem>
        <FormItem label="班次" prop="banci">
          <Input v-model="formCustom.banci" type="text"/>
        </FormItem>
        <FormItem>
          <Button
            type="primary"
            @click="handleSubmit('formCustom')"
            style="margin-right: 20px;"
          >Submit</Button>
          <Button @click="handleReset('formCustom')" style="margin-left: 8px">Reset</Button>
        </FormItem>
      </Form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    const validatejobName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('职位名不能为空'));
      }
      callback();
    };
    const validatejobInfo = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('职位信息不能为空'));
      }
      callback();
    };
    const validatebanci = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('班次不能为空'));
      }
      callback();
    };

    return {
      formCustom: {
        jobName: '',
        jobInfo: '',
        banci: '',
      },
      ruleCustom: {
        jobName: [
          { validator: validatejobName, trigger: 'blur' }
        ],
        jobInfo: [
          { validator: validatejobInfo, trigger: 'blur' }
        ],
        banci: [
          { validator: validatebanci, trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {


          this.$Message.success('Success!');
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
