<template>
  <div>
    <div class="add">
      <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="80" class="form">
        <FormItem label="部门" prop="diviName">
            <Select style="width:200px" v-model="formCustom.diviName">
              <Option value="as">行政部</Option>
              <Option value="td">技术部</Option>
              <Option value="od">运营部</Option>
              <Option value="ad">财务部</Option>
              <Option value="sd">销售部</Option>
            </Select>
        </FormItem>
        <FormItem label="部门信息" prop="depInfo">
            <Input v-model="formCustom.depInfo" type="textarea" :rows="4" placeholder="Enter something..." />
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
      
      const validatedepInfo = (rule, value, callback) => {
          if (!value) {
              return callback(new Error('部门信息不能为空'));
          }
      };
      return {
          formCustom: {
                diviName: '',
                depInfo: '',
          },
          ruleCustom: {
                depInfo: [
                    { validator: validatedepInfo, trigger: 'blur' }
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
