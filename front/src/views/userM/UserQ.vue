<template>
  <div>
    <Table border :columns="columns" :data="data1">
      <template slot-scope="{ row }" slot="loginname">
        <strong>{{ row.loginname }}</strong>
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
          title: '用户名',
          slot: 'loginname',
          align: 'center'
        },
        {
          title: '密码',
          key: 'password',
          align: 'center'
        },
        {
          title: '部门',
          key: 'diviname',
          align: 'center'
        },
        {
          title: '操作',
          slot: 'action',
          width: 150,
          align: 'center'
        }
      ],
      data1: [
        {
          index: 1,
          loginname: 'admin',
          password: 'admina',
          diviname: '行政部'
        },
        {
          index: 2,
          loginname: '123',
          password: '123789',
          diviname: '销售部'
        },
        {
          index: 3,
          loginname: '123456',
          password: '123456',
          diviname: '财务部'
        }
      ]
    };
  },
  methods: {
    show(index) {
      this.$Modal.info({
        title: '用户信息',
        content: `序号：${this.data1[index].index}<br>
                    用户名：${this.data1[index].loginname}<br>
                    密码：${this.data1[index].password}<br>
                    部门：${this.data1[index].diviname}`
      });
    },
    remove(index) {
      this.data1.splice(index, 1);
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
