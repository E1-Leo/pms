<template>
  <div>
    <Table border :columns="columns" :data="data2">
      <template slot-scope="{ row }" slot="diviname">
        <strong>{{ row.diviname }}</strong>
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
          title: '部门名',
          slot: 'diviname',
          align: 'center'
        },
        {
          title: '部门信息',
          key: 'depinfo',
          align: 'center'
        },
        {
          title: '操作',
          slot: 'action',
          width: 150,
          align: 'center'
        }
      ],
      data2: [
        {
          index: 1,
          diviname: '行政部',
          depinfo: '综合协调、公文处理、档案管理、人事管理、后勤服务 等',
        },
        {
          index: 2,
          diviname: '销售部',
          depinfo: '正确掌握市场、 负责收集、整理、归纳客户资料，对客户群进行透彻的分析、管理销售活动 等',
        },
        {
          index: 3,
          diviname: '财务部',
          depinfo: '负责公司日常财务核算、根据公司资金运作情况，合理调配资金，确保公司资金正常运转、负责企业的资产管理、债权债务的管理工作 等',
        },
        {
          index: 4,
          diviname: '技术部',
          depinfo: '负责对新产品的设计和开发的控制及编制各类技术文件、负责产品的监视和测量控制工作 等',
        }
      ]
    };
  },
  methods: {
    show(index) {
      this.$Modal.info({
        title: '用户信息',
        content: `序号：${this.data2[index].index}<br>
                  部门：${this.data2[index].diviname}<br>
                  部门信息：${this.data2[index].depinfo}`
      });
    },
    remove(index) {
      this.data2.splice(index, 1);
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
