<template>
  <div>
    <Table border :columns="columns" :data="list">
      <template slot-scope="{ row }" slot="name">
        <strong>{{ row.name }}</strong>
      </template>
      <template slot-scope="{ row, index }" slot="action">
        <i-button type="primary" size="small" style="margin-right: 5px" @click="show(index)">View</i-button>
        <Button type="error" size="small" @click="remove(row.id)">Delete</Button>
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
  </div>
</template>

<script>
import axios from 'axios';
import utils from '../../utils.js';
export default {
  data() {
    return {
      total: 0,
      page: 1,
      pageSize: 5,
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
          align: 'center',
          render: (h, params) => {
            let index = this.departmentList.findIndex(obj => {
              return obj.id == params.row.department;
            });
            if (index >= 0) {
              return h('span', this.departmentList[index].department);
            }
            return null;
          }
        },
        {
          title: '职位',
          key: 'jobname',
          align: 'center'
        },
        {
          title: '入职时间',
          key: 'jobtime',
          align: 'center',
          render: (h, params) => {
            return h('span', this.getTime(params.row.jobtime));
          }
        },
        {
          title: '操作',
          slot: 'action',
          width: 150,
          align: 'center'
        }
      ],
      departmentList: [],
      list: []
    };
  },
  created() {
    this.getList(this.page);
    this.getdepartment();
  },
  methods: {
    getdepartment(page = 1) {
      axios
        .get('/api/department/list?offset=0&pageSize=999')
        .then(({ data }) => {
          if (data.success) {
            this.departmentList = data.res.list;
          }
        });
    },
    getTime(jobtime) {
      let time = utils.parseTime(jobtime, 'yyyy-MM-dd');
      return time;
    },
    getList(page = 1) {
      let offset = this.pageSize * (page - 1);
      axios
        .get('/api/staff/list?offset=' + offset + '&pageSize=' + this.pageSize)
        .then(({ data }) => {
          if (data.success) {
            this.list = data.res.list;
            this.total = data.res.total;
          }
        });
    },
    show(index) {
      this.$Modal.info({
        title: '员工信息',
        content: `编号：${this.list[index].id}<br>
                  姓名: ${this.list[index].name}<br>
                  部门：${this.list[index].department}<br>
                  职位：${this.list[index].jobname}<br>
                  入职时间：${this.getTime(this.list[index].jobtime)}`
      });
    },
    remove(id) {
      axios.post('/api/staff/delete', { id: id }).then(({ data }) => {
        if (data.success) {
          let index = this.list.findIndex(function(obj) {
            return obj.id === id;
          });
          if (index >= 0) {
            this.list.splice(index, 1);
          }
        }
      });
    },
    currentChange(page) {
      this.getList(page);
      this.$router.push({
        name: this.$route.name,
        query: {
          tab: this.$route.query.tab,
          page
        }
      });
    }
  }
};
</script>

<style scoped>
.page {
  margin-top: 20px;
  float: right;
}
</style>
