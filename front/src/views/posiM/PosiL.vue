<template>
  <div>
    <Table border :columns="columns" :data="data4">
      <template slot-scope="{ row }" slot="jobname">
        <strong>{{ row.jobname }}</strong>
      </template>
      <template slot-scope="{ row, index }" slot="action">
        <Button
          type="primary"
          size="small"
          style="margin-right: 5px"
          @click="show(index)"
          >View</Button
        >
        <Button type="error" size="small" @click="remove(index)">Delete</Button>
      </template>
    </Table>
    <div class="page">
      <Page 
        :total="total" 
        :page-size="40" 
        :current.sync="page" 
        @on-change="currentChange">
      </Page>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserQ',
  data() {
    return {
      total: 9999,
      page: 1,
      columns: [
        {
          title: '序号',
          key: 'index',
          align: 'center'
        },
        {
          title: '职位名',
          slot: 'jobname',
          align: 'center'
        },
        {
          title: '职位信息',
          key: 'jobinfo',
          align: 'center'
        },
        {
          title: '班次',
          key: 'banci',
          align: 'center'
        },
        {
          title: '操作',
          slot: 'action',
          width: 150,
          align: 'center'
        }
      ],
      data4: [
        {
          index: 1,
          jobname: '总经理',
          jobinfo: '主持公司的日常各项经营管理工作 等',
          banci: '9:00 - 17:00',
        },
        {
          index: 2,
          jobname: 'web前端工程师',
          jobinfo: '前端设计与开发',
          banci: '8:30 - 17:30',
        },
        {
          index: 3,
          jobname: '财务会计',
          jobinfo: '日常单据一级审核（费用报销单、付款单等），日常的账务处理（记账） 等',
          banci: '8:30 - 17:00',
        }
      ]
    };
  },
  methods: {
    show(index) {
      this.$Modal.info({
        title: '用户信息',
        content: `序号：${this.data4[index].index}<br>
                  职位名：${this.data4[index].jobname}<br>
                  职位信息：${this.data4[index].jobinfo}<br>
                  班次：${this.data4[index].banci}`
      });
    },
    remove(index) {
      this.data4.splice(index, 1);
    },
    currentChange (page) {
      this.$router.push({
          name: this.$route.name,
          query: {
              tab: this.$route.query.tab,
              page,
          }
      })
    },
  }
};
</script>

<style scoped>
.page {
  margin-top: 20px;
  float: right;
}
</style>
