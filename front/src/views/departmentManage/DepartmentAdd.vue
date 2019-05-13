<template>
  <div>
    <div class="add">
      <i-form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="80" class="form">
        <FormItem label="部门" prop="department">
          <Input v-model="formCustom.department" type="text" placeholder="Enter department"/>
        </FormItem>
        <FormItem label="部门信息" prop="departmentInfo">
          <Input
            v-model="formCustom.departmentInfo"
            type="textarea"
            :rows="4"
            placeholder="Enter something..."
          />
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
    const validatedepartment = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('部门不能为空'));
      }
      callback();
    };
    const validatedepartmentInfo = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('部门信息不能为空'));
      }
      callback();
    };
    return {
      formCustom: {
        department: '',
        departmentInfo: ''
      },
      ruleCustom: {
        department: [{ validator: validatedepartment, trigger: 'blur' }],
        departmentInfo: [{ validator: validatedepartmentInfo, trigger: 'blur' }]
      }
    };
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          axios.post('/api/department/create', {
            department: this.formCustom.department,
            departmentinfo: this.formCustom.departmentInfo
          })
          .then(({data}) => {
            if (data.success) {
              this.$Message.success('提交成功!');
              this.$router.push('/departmentlist')
            }
          })
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
