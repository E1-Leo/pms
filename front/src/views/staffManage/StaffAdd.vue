<template>
  <div>
    <div class="add">
      <i-form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="80" class="form">
        <FormItem label="姓名" prop="name">
          <Input v-model="formCustom.name" type="text"/>
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
        <FormItem label="职位名" prop="jobName">
          <Input v-model="formCustom.jobName" type="text"/>
        </FormItem>
        <FormItem label="入职时间" prop="jobTime">
          <DatePicker
            type="date"
            v-model="formCustom.jobTime"
            :options="options1"
            placeholder="Select date"
            style="width: 200px"
          ></DatePicker>
        </FormItem>
        <FormItem>
          <i-button type="primary" @click="handleSubmit('formCustom')"
            >提交</i-button
          >
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
    const validateName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('姓名不能为空'));
      }
      callback(); 
    };
    const validatejobName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('职位不能为空'));
      }
      callback(); 
    };
    const validatejobTime = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('入职时间不能为空'));
      }
      callback(); 
    };

    return {
      formCustom: {
        name: '',
        department: '',
        jobName: '',
        jobTime: '',
      },
      ruleCustom: {
        name: [
          { validator: validateName, trigger: 'blur' }
        ],
        department: [
          { validator: validatejobName, trigger: 'blur' }
        ],
        jobName: [
          { validator: validatejobTime, trigger: 'blur' }
        ]
      },
      options1: {
        shortcuts: [
          {
            text: 'Today',
            value() {
              return new Date();
            },
            onClick: picker => {
              this.$Message.info('Click today');
            }
          },
          {
            text: 'Yesterday',
            value() {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              return date;
            },
            onClick: picker => {
              this.$Message.info('Click yesterday');
            }
          },
          {
            text: 'One week',
            value() {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              return date;
            },
            onClick: picker => {
              this.$Message.info('Click a week ago');
            }
          }
        ]
      }
    };
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          axios.post('/api/staff/create', { 
            name: this.formCustom.name, 
            department: this.formCustom.department,
            jobname: this.formCustom.jobName,
            jobtime: this.formCustom.jobTime ? this.formCustom.jobTime.getTime() : 0
          })
          .then(({data}) => {
            if( data.success ) {
              this.$Message.success('提交成功!');
              this.$router.push('/stafflist')
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
