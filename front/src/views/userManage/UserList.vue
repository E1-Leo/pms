<template>
  <div>
    <Table border :columns="columns" :data="list">
      <template slot-scope="{ row }" slot="username">
        <strong>{{ row.username }}</strong>
      </template>
      <template slot-scope="{ row, index }" slot="action">
        <Button type="primary" size="small" style="margin-right: 15px" @click="show(index)">查看</Button>
        <Button type="primary" size="small" style="margin-right: 15px" @click="openModal(row)">修改</Button>
        <Button type="error" size="small" @click="remove(row.id)">删除</Button>
      </template>
    </Table>
    <div class="page">
      <Page
        :total="total"
        :page-size="pageSize"
        :current.sync="page"
        @on-change="currentChange"
        show-total
      ></Page>
    </div>
    <Modal
      v-model="showModal"
      title="修改"
      :loading="loading"
      @on-ok="confirmModify"
      @on-cancel="cancelModify"
    >
      <p>用户名：</p>
      <Input type="text" v-model="modalData.username" />
    </Modal>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      total: 0,
      page: 1,
      pageSize: 5,
      showModal: false,
      loading: true,
      modalData: {},
      columns: [
        {
          title: '编号',
          key: 'id',
          align: 'center'
        },
        {
          title: '用户名',
          slot: 'username',
          align: 'center'
        },
        {
          title: '操作',
          slot: 'action',
          align: 'center'
        }
      ],
      list: []
    };
  },
  created() {
    this.getList(this.page);
  },
  methods: {
    getList(page = 1) {
      let offset = this.pageSize*(page-1);
      axios.get('/api/user/list?offset='+offset+'&pageSize='+this.pageSize)
        .then(({data}) => {
          if(data.success) {
            this.list = data.res.list;
            this.total = data.res.total;
          }
        })
    },
    show(index) {
      this.$Modal.info({
        title: '用户信息',
        content: `编号：${this.list[index].id}<br>
                  用户名：${this.list[index].username}`
      });
    },
    openModal (record) {
      this.showModal = true;
      this.modalData = {...record};
    },
    confirmModify () {
      axios.post('/api/user/update', {username: this.modalData.username, id: this.modalData.id})
        .then(({data}) => {
          if (data.success) {
            this.$Message.success('更新成功');
            this.showModal = false;
            this.getList(this.page);
          }
        })
    },
    cancelModify () {
      this.showModal = false;
    },
    remove(id) {
      axios.post('/api/user/delete', {id: id})
        .then(({data}) => {
          if(data.success) {
            let index = this.list.findIndex(function(obj) {
              return obj.id === id
            })
            if (index >= 0) {
              this.list.splice(index, 1);
            }
          }
        })
    },
    currentChange (page) {
      this.getList(page);
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
