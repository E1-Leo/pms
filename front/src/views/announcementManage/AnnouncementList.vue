<template>
  <div>
    <Table border :columns='columns' :data='list'>
      <template slot-scope='{ row }' slot='publishname'>
        <strong>{{ row.publishname }}</strong>
      </template>
      <template slot-scope='{ row, index }' slot='action'>
        <Button type='primary' size='small' style='margin-right: 5px' @click='show(index)'>查看</Button>
        <Button type="primary" size="small" style="margin-right: 5px" @click="openModal(row)">修改</Button>
        <Button type='error' size='small' @click='remove(row.id)'>删除</Button>
      </template>
    </Table>
    <div class='page'>
      <Page 
        :total='total' 
        :page-size='pageSize' 
        :current.sync='page' 
        @on-change='currentChange'
        show-total>
      </Page>
    </div>
    <Modal
      v-model="showModal"
      title="修改"
      :loading="loading"
      @on-ok="confirmModify"
      @on-cancel="cancelModify"
    >
      <p>公告标题：</p>
      <Input type="text" v-model="modalData.announcementtitle" />
      <p>公告内容：</p>
      <Input type="text" v-model="modalData.announcementinfo"/>
      <p>发布时间：</p>
      <Input type="text" v-model="modalData.publishtime"/>
      <p>发布人：</p>
      <Input type="text" v-model="modalData.publishname"/>
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
          title: '公告标题',
          key: 'announcementtitle',
          align: 'center'
        },
        {
          title: '公告内容',
          key: 'announcementinfo',
          align: 'center'
        },
        {
          title: '发布时间',
          key: 'publishtime',
          align: 'center',
          render: (h, params) => {
            return h('span', this.getTime(params.row.publishtime));
          }
        },
        {
          title: '发布人',
          slot: 'publishname',
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
    getTime(publishtime) {
      let time = utils.parseTime(publishtime, 'yyyy-MM-dd');
      return time;
    },
    getList(page = 1) {
      let offset = this.pageSize*(page-1);
      axios.get('/api/announcement/list?offset='+offset+'&pageSize='+this.pageSize)
        .then(({data}) => {
          if(data.success) {
            this.list = data.res.list;
            this.total = data.res.total;
          }
        })
    },
    show(index) {
      this.$Modal.info({
        title: '公告信息',
        content: `编号：${this.list[index].id}<br>
                  公告标题：${this.list[index].announcementtitle}<br>
                  公告内容：${this.list[index].announcementinfo}<br>
                  发布时间：${this.getTime(this.list[index].publishtime)}<br>
                  发布人：${this.list[index].publishname}`
      });
    },
    openModal (record) {
      this.showModal = true;
      this.modalData = {...record};
    },
    confirmModify () {
      axios.post('/api/announcement/update', {...this.modalData})
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
      axios.post('/api/announcement/delete', {id: id})
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
