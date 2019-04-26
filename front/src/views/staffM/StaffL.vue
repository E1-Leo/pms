<template>
  <div>
    <Table border :columns="columns" :data="data2">
      <template slot-scope="{ row }" slot="name">
        <strong>{{ row.name }}</strong>
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
          title: '姓名',
          slot: 'name',
          align: 'center'
        },
        {
          title: '部门',
          key: 'diviname',
          align: 'center'
        },
        {
          title: '职位',
          key: 'jobname',
          align: 'center'
        },
        {
          title: '入职时间',
          key: 'jobtime',
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
          name: '王焕',
          diviname: '行政部',
          jobname: '总经理',
          jobtime: '2017-01-20',
        },
        {
          index: 2,
          name: '李黑',
          diviname: '销售部',
          jobname: '销售经理',
          jobtime: '2018-06-15',
        },
        {
          index: 3,
          name: '程辉',
          diviname: '财务部',
          jobname: '财务会计',
          jobtime: '2018-11-05',
        },
        {
          index: 4,
          name: '陈燕',
          diviname: '技术部',
          jobname: '技术总监',
          jobtime: '2017-08-09',
        }
      ]
    };
  },
  methods: {
    show(index) {
      this.$Modal.info({
        title: '用户信息',
        content: `序号：${this.data2[index].index}<br>
                  姓名: ${this.data2[index].name}<br>
                  部门：${this.data2[index].diviname}<br>
                  职位：${this.data2[index].jobname}<br>
                  入职时间：${this.data2[index].jobtime}`
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
