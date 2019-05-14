<template>
  <div>
    <div class="add">
      <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="80" class="form">
        <FormItem label="公告标题" prop="announcementTitle">
          <Input v-model="formCustom.announcementTitle" type="text" placeholder="Enter title..."/>
        </FormItem>
        <FormItem label="公告内容" prop="announcementInfo">
          <Input
            v-model="formCustom.announcementInfo"
            type="textarea"
            :rows="4"
            placeholder="Enter something..."
          />
        </FormItem>
        <FormItem label="发布时间" prop="publishTime">
          <DatePicker
            type="date"
            v-model="formCustom.publishTime"
            :options="options1"
            placeholder="Select date"
            style="width: 200px"
          ></DatePicker>
        </FormItem>
        <FormItem label="发布人" prop="publishName">
          <Input v-model="formCustom.publishName" type="text" placeholder="Enter name..."/>
        </FormItem>
        <FormItem>
          <Button
            type="primary"
            @click="handleSubmit('formCustom')"
            style="margin-right: 20px;"
          >提交</Button>
          <Button @click="handleReset('formCustom')" style="margin-left: 8px">重置</Button>
        </FormItem>
      </Form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    const validateannouncementTitle = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('公告标题不能为空'));
      }
      callback();
    };
    const validateannouncementInfo = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('公告内容不能为空'));
      }
      callback();
    };
    const validatepublishTime = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('发布时间不能为空'));
      }
      callback();
    };
    const validatepublishName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('发布人不能为空'));
      }
      callback();
    };

    return {
      formCustom: {
        announcementTitle: '',
        announcementInfo: '',
        publishTime: '',
        publishName: ''
      },
      ruleCustom: {
        announcementTitle: [
          { validator: validateannouncementTitle, trigger: 'blur' }
        ],
        announcementInfo: [
          { validator: validateannouncementInfo, trigger: 'blur' }
        ],
        publishTime: [{ validator: validatepublishTime, trigger: 'blur' }],
        publishName: [{ validator: validatepublishName, trigger: 'blur' }]
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
          axios.post('/api/announcement/create', {
            announcementtitle: this.formCustom.announcementTitle,
            announcementinfo: this.formCustom.announcementInfo,
            publishtime: this.formCustom.publishTime ? this.formCustom.publishTime.getTime() : 0,
            publishname: this.formCustom.publishName
          })
          .then(({data}) => {
            if(data.success) {
              this.$Message.success('提交成功');
              this.$router.push('/announcementlist')
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
