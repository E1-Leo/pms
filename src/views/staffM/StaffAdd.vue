<template>
  <div>
    <div class="add">
      <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="80" class="form">
        <FormItem label="姓名" prop="Name">
          <Input v-model="formCustom.Name" type="text"/>
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
export default {
  data() {
    const validateName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("姓名不能为空"));
      }
    };
    const validatejobName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("职位不能为空"));
      }
    };
    const validatejobTime = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("入职时间不能为空"));
      }
    };

    return {
      formCustom: {
        Name: '',
        diviName: '',
        jobName: '',
        jobTime: '',
      },
      ruleCustom: {
        Name: [
          { validator: validateName, trigger: "blur" }
        ],
        jobName: [
          { validator: validatejobName, trigger: "blur" }
        ],
        jobTime: [
          { validator: validatejobTime, trigger: "blur" }
        ],

      },
      options1: {
        shortcuts: [
          {
            text: "Today",
            value() {
              return new Date();
            },
            onClick: picker => {
              this.$Message.info("Click today");
            }
          },
          {
            text: "Yesterday",
            value() {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              return date;
            },
            onClick: picker => {
              this.$Message.info("Click yesterday");
            }
          },
          {
            text: "One week",
            value() {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              return date;
            },
            onClick: picker => {
              this.$Message.info("Click a week ago");
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
          this.$Message.success("Success!");
        } else {
          this.$Message.error("Fail!");
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
