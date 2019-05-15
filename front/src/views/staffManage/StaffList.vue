<template>
  <div>
    <Table border :columns="columns" :data="list">
      <template slot-scope="{ row }" slot="name">
        <strong>{{ row.name }}</strong>
      </template>
      <template slot-scope="{ row, index }" slot="action">
        <Button type="primary" size="small" style="margin-right: 5px" @click="show(index)">查看</Button>
        <Button type="primary" size="small" style="margin-right: 5px" @click="openModal(row)">修改</Button>
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
      <p>姓名：</p>
      <Input type="text" v-model="modalData.name" />
      <p>部门：</p>
      <Select style="width:100%"  v-model="modalData.department">
        <Option v-for="item in departmentList" :key="item.id" :value="item.id">{{ item.department }}</Option>
      </Select>
      <p>职位：</p>
      <Input type="text" v-model="modalData.jobname"/>
      <p>入职时间：</p>
      <DatePicker
        type="date"
        v-model="modalData.jobtime"
        placeholder="选择日期"
        style="width: 100%"
      ></DatePicker>
    </Modal>
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
    getdepartment() {
      axios.get('/api/department/alllist')
        .then(({ data }) => {
          if (data.success) {
            this.departmentList = data.res;
          }
        });
    },
    getTime(jobtime) {
      let time = utils.parseTime(jobtime, 'yyyy-MM-dd');
      return time;
    },
    getList(page = 1) {
      let offset = this.pageSize * (page - 1);
      axios.get('/api/staff/list?offset=' + offset + '&pageSize=' + this.pageSize)
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
    openModal (record) {
      this.showModal = true;
      this.modalData = {...record, jobtime: new Date(record.jobtime)};
    },
    confirmModify () {
      axios.post('/api/staff/update', {...this.modalData, jobtime: this.modalData.jobtime ? this.modalData.jobtime.getTime() : 0})
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
