<template>
  <div>
    <Table border :columns="columns" :data="data3">
      <template slot-scope="{ row }" slot="username">
        <strong>{{ row.username }}</strong>
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
          title: '公告标题',
          key: 'anntitle',
          align: 'center'
        },
        {
          title: '公告内容',
          key: 'anninfo',
          align: 'center'
        },
        {
          title: '发布时间',
          key: 'time',
          align: 'center'
        },
        {
          title: '发布人',
          slot: 'username',
          align: 'center'
        },
        {
          title: '操作',
          slot: 'action',
          width: 150,
          align: 'center'
        }
      ],
      data3: [
        {
          index: 1,
          anntitle: '各个部门经理开会！',
          anninfo: '明天10点会议室开会，各部门经理请准时到达。',
          time: '2018-03-17',
          username: '叶胜',
        },
        {
          index: 2,
          anntitle: '国庆全体放假！',
          anninfo: '明天国庆，全体放假。',
          time: '2018-09-30',
          username: '陈霞',
        },
      ]
    };
  },
  methods: {
    show(index) {
      this.$Modal.info({
        title: '用户信息',
        content: `序号：${this.data3[index].index}<br>
                  公告标题：${this.data3[index].anntitle}<br>
                  公告内容：${this.data3[index].anninfo}<br>
                  发布时间：${this.data3[index].time}<br>
                  发布人：${this.data3[index].username}`
      });
    },
    remove(index) {
      this.data3.splice(index, 1);
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
