<template>
  <div>
    <Table border :columns="columns" :data="list">
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
        <Button type="error" size="small" @click="remove(row.id)">Delete</Button>
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
import axios from 'axios';
export default {
  data() {
    return {
      total: 9999,
      page: 1,
      columns: [
        {
          title: '编号',
          key: 'id',
          align: 'center'
        },
        {
          title: '姓名',
          slot: 'name',
          align: 'center'
        },
        {
          title: '部门',
          key: 'department',
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
      list: []
    };
  },
  
  created() {
    this.getList();
  },
  methods: {
    getList() {
      axios.get('/api/staff/list')
        .then(({data}) => {
          this.list = data.data;
        })
    },
    show(index) {
      this.$Modal.info({
        title: '用户信息',
        content: `序号：${this.list[index].id}<br>
                  姓名: ${this.list[index].name}<br>
                  部门：${this.list[index].department}<br>
                  职位：${this.list[index].jobname}<br>
                  入职时间：${this.list[index].jobtime}`
      });
    },
    remove(id) {
      axios.post('/api/staff/delete', {id: id})
        .then(({data}) => {
          if(data.success) {
            let index = this.list.findIndex(function(obj) {
              return obj.id === id
            })
            if (index >=0) {
              this.list.splice(index, 1);
            }
          }
        })
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
