<template>
  <div>
    <Table border :columns='columns' :data='list'>
      <template slot-scope='{ row }' slot='publishname'>
        <strong>{{ row.publishname }}</strong>
      </template>
      <template slot-scope='{ row, index }' slot='action'>
        <Button
          type='primary'
          size='small'
          style='margin-right: 5px'
          @click='show(index)'
          >View</Button
        >
        <Button type='error' size='small' @click='remove(row.id)'>Delete</Button>
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
          align: 'center'
        },
        {
          title: '发布人',
          slot: 'publishname',
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
    this.getList(this.page);
  },
  methods: {
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
        title: '用户信息',
        content: `编号：${this.list[index].id}<br>
                  公告标题：${this.list[index].announcementtitle}<br>
                  公告内容：${this.list[index].announcementinfo}<br>
                  发布时间：${this.list[index].publishtime}<br>
                  发布人：${this.list[index].publishname}`
      });
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
